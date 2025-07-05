import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
    const navigate = useNavigate();

    const CreateData = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const payload = {
            project: formData.get('project'),
            month: formData.get('month'),
            title: formData.get('title'),
            word: formData.get('word'),
            type: formData.get('type'),
            given: formData.get('given')
        };

        await axios.post("/api/createTopic", payload);
        navigate("/");
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="col-md-8 col-lg-6">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        <h3 className="card-title mb-4 text-center text-primary">Create New Topic</h3>
                        <form onSubmit={CreateData}>
                            <div className="mb-3">
                                <label className="form-label">Project</label>
                                <input type="text" className="form-control" name="project" placeholder="Enter project name" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Month</label>
                                <input type="text" className="form-control" name="month" placeholder="e.g. July" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control" name="title" placeholder="Enter title" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Word Count</label>
                                <input type="number" className="form-control" name="word" placeholder="e.g. 1000" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Type</label>
                                <select className="form-select" name="type" required>
                                    <option value="">Select type</option>
                                    <option value="Blog Post">Blog Post</option>
                                    <option value="Guest Post">Guest Post</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Topic Researcher</label>
                                <input type="text" className="form-control" name="given" placeholder="Your Name" required />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Create Topic</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
