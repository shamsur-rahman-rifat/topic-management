import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../loader/loader';
import { Link } from 'react-router-dom';

const HomePage = () => {

    const [Data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            await ReadData();
        })();
    }, []);

    const ReadData = async () => {
        let res = await axios.get("/api/readTopic");
        setData(res.data['row']);
    };

    const DeleteData = async (id) => {
        await axios.delete("/api/deleteTopic/" + id);
        await ReadData();
    };

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Project Topics</h2>
                <Link className="btn btn-success btn-sm px-4" to="/create">
                    + Create New
                </Link>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered align-middle text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Project</th>
                                    <th>Month</th>
                                    <th>Title</th>
                                    <th>Word</th>
                                    <th>Type</th>
                                    <th>Given</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Data.length === 0 ? (
                                        <tr>
                                            <td colSpan="7">
                                                <Loader />
                                            </td>
                                        </tr>
                                    ) : (
                                        Data.map((item, i) => (
                                            <tr key={i}>
                                                <td>{item['project']}</td>
                                                <td>{item['month']}</td>
                                                <td>{item['title']}</td>
                                                <td>{item['word']}</td>
                                                <td>
                                                    <span className="badge bg-light text-secondary border px-3 py-2">
                                                        {item['type']}
                                                    </span>
                                                </td>
                                                <td>{item['given']}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <button 
                                                            onClick={() => DeleteData(item['_id'])} 
                                                            className="btn btn-outline-danger btn-sm me-2 px-3"
                                                        >
                                                            Delete
                                                        </button>
                                                        <Link 
                                                            className="btn btn-outline-primary btn-sm px-3" 
                                                            to={'update/' + item['_id']}
                                                        >
                                                            Edit
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
