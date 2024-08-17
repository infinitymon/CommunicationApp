import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';


const HomePage = () => {
    const [result, setResult] = useState(null);

    const token = Cookies.get('token')
    const tokenData = jwtDecode(token)

    const agentId = `${tokenData.role} ${tokenData.id}`

    // console.log('The agent id is ' + agentId)

    useEffect(()=>{
        axios.get('http://localhost:5000/call', {
            params: {
                agent: agentId
            }
        }).then(res => {
            const { data } = res.data; 
            setResult(data)
        })
    },[])

    
    return(
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
                        <th className="col-lg-1">Resolution</th>
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
                            <td>{item.followupStatus}</td>
                            <td>{item.resolution}</td>
                        </tr>
                    ))}
                </tbody>
                <tr>

                </tr>
            </table>
        </div>
    )
}

export default HomePage;