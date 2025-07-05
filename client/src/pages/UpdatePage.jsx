import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePage = () => {
    const { id } = useParams();
    const [existing, setExisting] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await axios.get(`/api/readTopicById/${id}`);
            setExisting(res.data['row'][0]);
        })();
    }, [id]);

    const updateData = async (event) => {
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

        await axios.put(`/api/updateTopic/${id}`, payload);
        navigate('/');
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="col-md-8 col-lg-6">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        <h3 className="card-title mb-4 text-center text-primary">Update Topic</h3>
                        {existing && (
                            <form onSubmit={updateData}>
                                <div className="mb-3">
                                    <label className="form-label">Project</label>
                                    <input type="text" className="form-control" name="project" defaultValue={existing.project} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Month</label>
                                    <input type="text" className="form-control" name="month" defaultValue={existing.month} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" defaultValue={existing.title} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Word Count</label>
                                    <input type="number" className="form-control" name="word" defaultValue={existing.word} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Type</label>
                                    <select className="form-select" name="type" defaultValue={existing.type} required>
                                        <option value="">Select type</option>
                                        <option value="Blog Post">Blog Post</option>
                                        <option value="Guest Post">Guest Post</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Given Topic</label>
                                    <input type="text" className="form-control" name="given" defaultValue={existing.given} required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Update Topic</button>
                                </div>
                            </form>
                        )}
                        {!existing && (
                            <div className="text-center py-3">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePage;
