import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../apiClient';
import { useAuth } from '../context/AuthContext';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axiosClient.get('/blogs');
                if (res.data.success) {
                    setBlogs(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div className="container text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    }

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="fw-bold display-5">Bug Bounty & Security Blog</h1>
                {user ? (
                    <Link to="/blog/create" className="btn btn-dark px-4 py-2 fw-semibold shadow-sm">
                        Write an Article
                    </Link>
                ) : (
                    <Link to="/login" className="btn btn-outline-dark px-4 py-2 fw-semibold shadow-sm">
                        Sign In to Post Blog
                    </Link>
                )}
            </div>

            <div className="row g-4">
                {blogs.length === 0 ? (
                    <div className="col-12 text-center text-muted py-5">
                        <h4>No blog posts found.</h4>
                        <p>Be the first to share your security insights!</p>
                    </div>
                ) : (
                    blogs.map(blog => (
                        <div key={blog._id} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden" style={{ transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                                {blog.imageUrl ? (
                                    <img src={blog.imageUrl} className="card-img-top" alt={blog.title} style={{ height: "220px", objectFit: "cover" }} />
                                ) : (
                                    <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: "220px" }}>
                                        <div style={{ fontSize: "3rem" }}>📝</div>
                                    </div>
                                )}
                                <div className="card-body p-4 d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <small className="badge bg-dark rounded-pill fw-normal px-3 py-2">
                                            {blog.tags && blog.tags.length > 0 ? blog.tags[0] : "Security"}
                                        </small>
                                        <small className="text-muted fw-semibold">{blog.readTime} min read</small>
                                    </div>
                                    <h4 className="card-title fw-bold mb-3">{blog.title}</h4>
                                    <p className="card-text text-muted mb-4 flex-grow-1" style={{ lineHeight: "1.6" }}>
                                        {blog.content.length > 120 ? blog.content.substring(0, 120) + '...' : blog.content}
                                    </p>
                                    <div className="mt-auto d-flex align-items-center justify-content-between pt-3 border-top">
                                        <div className="d-flex align-items-center">
                                            {blog.author?.avatarUrl ? (
                                                <img src={blog.author.avatarUrl} alt={blog.author.username} className="rounded-circle me-2" style={{ width: "32px", height: "32px", objectFit: "cover" }} />
                                            ) : (
                                                <div className="bg-secondary rounded-circle me-2 d-flex align-items-center justify-content-center text-white" style={{ width: "32px", height: "32px" }}>
                                                    {blog.author?.username?.charAt(0).toUpperCase() || 'A'}
                                                </div>
                                            )}
                                            <span className="fw-semibold small">{blog.author?.username || "Anonymous"}</span>
                                        </div>
                                        <Link to={`/blog/${blog._id}`} className="text-decoration-none fw-bold text-dark">
                                            Read More &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Blog;
