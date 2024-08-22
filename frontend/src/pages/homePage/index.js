import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import './style.css';


const HomePage = () => {
    const [result, setResult] = useState(null);
    const [followUp, setFollowUp] = useState({});

    const handleChange = async (id, value) => {
        try {
            axios.put(`${process.env.REACT_APP_API_BASE_URL}/call/followUp`, {
                id: id,
                followUp: value
            })
            setFollowUp(prev => ({
                ...prev,
                [id]: value
            }));
        }
        catch (e) {
            console.log(e);
        }
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [resolutionInput, setResolutionInput] = useState('');
    const [resolvedItems, setResolvedItems] = useState(new Set());

    const handleResolutionClick = (item) => {
        if (!resolvedItems.has(item.id)) {
            setSelectedItem(item);
            setResolutionInput(item.resolution || ''); // Pre-fill with existing resolution if any
            setDialogOpen(true);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedItem(null);
        setResolutionInput('');
    };

    const handleSave = async () => {
        if (selectedItem) {
            try {

                await axios.put(`${process.env.REACT_APP_API_BASE_URL}/call/resolution`, {
                    id: selectedItem.id,
                    resolution: resolutionInput
                })

                console.log("SAVE BUTTON");

                setResolvedItems(prev => new Set(prev).add(selectedItem.id));
            }
            catch (err) {
                console.error('Error updating resolution:', err);
            }
        }
        handleDialogClose();
    };

    const handleFileUpload = (event, item) => {
        const file = event.target.files[0];
        if (file) {
            // Here you can directly use the file object
            console.log('Selected file:', file);

            // Example: You might want to read the file and upload its content
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileData = e.target.result;

                // Now you can send fileData and item.id to your server/database
                axios.put(`${process.env.REACT_APP_API_BASE_URL}/call/recUpload`, {
                    id: item.id,
                    recording: fileData
                })
                    .then(response => {
                        console.log('File uploaded successfully', response);
                    })
                    .catch(error => {
                        console.error('File upload failed', error);
                    });
            };
            reader.readAsDataURL(file); // Read file as data URL (you can also use readAsArrayBuffer or readAsBinaryString)
        }
    };

    const handleDialed = async (id) => {
        try {
            // Update the type in the database
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/call/typeUpdate`, {
                id: id,
                type: 'Dialed'
            });
    
            // Update the local state to reflect the change on the UI
            setResult(prevResult =>
                prevResult.map(item =>
                    item.id === id ? { ...item, type: 'Dialed' } : item
                )
            );
        } catch (error) {
            console.error('Error updating type to Dialed:', error);
        }
    };


    const token = Cookies.get('token')
    const tokenData = jwtDecode(token)

    const agentId = `${tokenData.role} ${tokenData.id}`

    const followOptions = ["Resolved", "Call Back", "Irrelevant"]

    // console.log('The agent id is ' + agentId)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/call`, {
            params: {
                agent: agentId
            }
        }).then(res => {
            const { data } = res.data;
            setResult(data)
        })
    }, [])


    return (
        <div className="container mt-5">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr className="col">
                        <th className="col-lg-1">Type</th>
                        <th className="col-lg-1">Status</th>
                        <th className="col-lg-1">From</th>
                        <th className="col-lg-1">To</th>
                        <th className="col-lg-1">Created</th>
                        <th className="col-lg-1">Dialed</th>
                        <th className="col-lg-1">Duration</th>
                        <th className="col-lg-1">Follow Up</th>
                        <th className="col-lg-2">Resolution</th>
                        <th className="col-lg-2">Upload Recording</th>
                    </tr>
                </thead>
                <tbody>
                    {result && result.map((item, index) => (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.status}</td>
                            <td>{item.from}</td>
                            <td>
                                {followUp[item.id] === 'Resolved' || item.followupStatus === 'Resolved' ? (
                                    <span>{item.to}</span>
                                ) : (
                                    <a href={`tel:${item.to}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }} 
                                    onClick={() => handleDialed(item.id)}>
                                        {item.to}
                                    </a>
                                )}
                            </td>
                            <td>{dayjs(item.createdDate).format('MM/DD/YYYY')}</td>
                            <td>{item.dialedDate}</td>
                            <td>{item.duration}</td>
                            <td>
                                <select value={followUp[item.id] || item.followupStatus || ''}
                                    onChange={(e) => handleChange(item.id, e.target.value)}>
                                    <option value="" disabled>Select an option</option>
                                    {followOptions.map((option, idx) => (
                                        <option key={idx} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td onClick={(e) => {
                                handleResolutionClick(item);
                                e.stopPropagation();
                            }}>
                                {item.resolution}
                            </td>
                            <td>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileUpload(e, item)}
                                    accept="audio/*" // Restrict to audio files
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {dialogOpen && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h2>Update Resolution</h2>
                        <input
                            type="text"
                            value={resolutionInput}
                            onChange={(e) => setResolutionInput(e.target.value)}
                        />
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleDialogClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomePage;