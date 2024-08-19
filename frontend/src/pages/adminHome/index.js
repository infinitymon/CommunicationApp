import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import './style.css';


const AdminHome = () => {
    const [result, setResult] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/call', {
            params: {
                agent: agentId
            }
        }).then(res => {
            const { data } = res.data;
            setResult(data)
        })
    }, []) // change this

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
                            <td>{item.to}</td>
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
        </div>
    )
}

export default AdminHome;