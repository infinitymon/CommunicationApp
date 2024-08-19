import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import Select from 'react-select';


const AdminHome = () => {
    const [result, setResult] = useState(null);
    const [filterOn, setFilterOn] = useState(null);
    const [filterOptions, setFilterOptions] = useState(null);
    const [filter, setFilter] = useState(null);
    const [pageNumber, setPageNumber] = useState(1)
    const [file, setFile] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState(null);

    const options = [
        { value: 'type', label: 'Type' },
        { value: 'status', label: 'Status' },
        { value: 'from', label: 'From' },
        { value: 'to', label: 'to' },
        { value: 'createdDate', label: 'Created Date' },
        { value: 'dialedDate', label: 'Dialed Date' },
        { value: 'followupStatus', label: 'Follow up Status' },
        
      ];

    const fetchData = async () => {
        axios.get(`http://localhost:5000/admin?page=${pageNumber}`).then(res => {
            setResult(res.data.data)
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData()
    }, [pageNumber])

    const handleUpload = async () => {

        const formData = new FormData();
        formData.append('file', file);

        await axios.post(`http://localhost:5000/admin/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(res => {
            fetchData()
        }).catch(err => console.log(err))
    }


    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-2">
                    <input className="col-2 me-1" type="file" onChange={e => setFile(e.target.files[0])}/>
                    <button className="btn btn-success" onClick={handleUpload}>
                        Upload
                    </button>
            </div>
            <div className="d-flex mb-2">
                <label className="me-2 fs-5">Filter On</label>
                <Select
                    className="col-2 me-2 text-start"
                    options={options}
                    onChange={e => setFilterOn(e.value)}
                />

                {filterOn &&
                    <Select
                        className="col-4 p-0"
                        type='text'
                        options={filterOptions}
                        onChange={e => setFilter(e.value)}
                    />
                }
            </div>
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
                        <th className="col-lg-2">Recording</th>
                    </tr>
                </thead>
                <tbody>
                    {result && result.callRecords && result.callRecords?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.type}</td>
                            <td>{item.status}</td>
                            <td>{item.from}</td>
                            <td>{item.to}</td>
                            <td>{dayjs(item.createdDate).format('MM/DD/YYYY')}</td>
                            <td>{item.dialedDate}</td>
                            <td>{item.duration}</td>
                            <td>{item.followupStatus}</td>
                            <td>{item.resolution}</td>
                            <td onClick={(e) => {setSelectedAudio(e.target.value); setDialogOpen(true)}}>{item.recording}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" >1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                <a class="page-link" href="#">Next</a>
                </li>
            </ul>
            </nav>


            {dialogOpen && (
                <div className="dialog">
                    <div className="dialog-content">
                        <h2>Call Recording</h2>
                        <audio src={selectedAudio} />
                        <button onClick={() => {setDialogOpen(false);setSelectedAudio(null);}}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminHome;