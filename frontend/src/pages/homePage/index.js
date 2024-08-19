import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import './style.css';


const HomePage = () => {
    const [result, setResult] = useState(null);
    const [followUp, setFollowUp] = useState({});

    const handleChange = (id, value) => {
        setFollowUp(prev => ({
            ...prev,
            [id]: value
        }));
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

    const handleSave = () => {
        // Update the resolution for the selected item
        if (selectedItem) {
            // You can perform an update operation here
            // For example, updating local state
            setResolvedItems(prev => new Set(prev).add(selectedItem.id));
        }
        handleDialogClose();
    };


    const token = Cookies.get('token')
    const tokenData = jwtDecode(token)

    const agentId = `${tokenData.role} ${tokenData.id}`

    const followOptions = ["Resolved", "Call Back", "Irrelevant"]

    // console.log('The agent id is ' + agentId)

    useEffect(() => {
        axios.get('http://localhost:5000/call', {
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
                        <th className="col-lg-1">Via Number</th>
                        <th className="col-lg-1">Created</th>
                        <th className="col-lg-1">Dialed</th>
                        <th className="col-lg-1">Duration</th>
                        <th className="col-lg-1">Follow Up</th>
                        <th className="col-lg-3">Resolution</th>
                    </tr>
                </thead>
                <tbody>
                    {result && result.map((item, index) => (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.status}</td>
                            <td>{item.from}</td>
                            <td>{item.to}</td>
                            <td>{item.from}</td>
                            <td>{dayjs(item.createdDate).format('MM/DD/YYYY')}</td>
                            <td>{item.dialedDate}</td>
                            <td>{item.duration}</td>
                            <td>
                                <select value={followUp[item.id] || ''}
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
                                e.stopPropagation(); // Prevent row click event
                            }}>
                                {item.resolution}
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