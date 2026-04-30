import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../apiClient';

const CreateBlog = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
        readTime: 5
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('tags', formData.tags);
        data.append('readTime', formData.readTime);
        if (image) {
            data.append('image', image);
        }

        try {
            const res = await axiosClient.post('/blogs', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.success) {
                navigate('/blog');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5">
                        <h2 className="fw-bold mb-4">Write a New Article</h2>
                        
                        {error && <div className="alert alert-danger rounded-3">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label fw-bold">Title</label>
                                <input type="text" className="form-control form-control-lg bg-light border-0" name="title" value={formData.title} onChange={handleChange} required placeholder="Enter a catchy title" />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold">Cover Image</label>
                                <input type="file" className="form-control bg-light border-0" onChange={handleImageChange} accept="image/*" />
                                <div className="form-text mt-2">A high-quality image makes your article stand out.</div>
                            </div>

                            <div className="row mb-4 g-3">
                                <div className="col-md-8">
                                    <label className="form-label fw-bold">Tags (comma separated)</label>
                                    <input type="text" className="form-control bg-light border-0" name="tags" value={formData.tags} onChange={handleChange} placeholder="Security, Penetration Testing, Bug Bounty" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Est. Read Time (mins)</label>
                                    <input type="number" className="form-control bg-light border-0" name="readTime" value={formData.readTime} onChange={handleChange} min="1" required />
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="form-label fw-bold">Content</label>
                                <textarea className="form-control bg-light border-0" name="content" value={formData.content} onChange={handleChange} rows="12" required placeholder="Write your insights here..."></textarea>
                            </div>

                            <div className="d-flex justify-content-end gap-3">
                                <button type="button" className="btn btn-outline-dark fw-semibold px-4" onClick={() => navigate('/blog')}>Cancel</button>
                                <button type="submit" className="btn btn-dark fw-semibold px-5" disabled={loading}>
                                    {loading ? 'Publishing...' : 'Publish Article'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
