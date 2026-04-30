import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosClient from '../apiClient';
import { useAuth } from '../context/AuthContext';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosClient.get(`/blogs/${id}`);
                if (res.data.success) {
                    setBlog(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching blog details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            try {
                const res = await axiosClient.delete(`/blogs/${id}`);
                if (res.data.success) {
                    navigate('/blog');
                }
            } catch (error) {
                console.error("Error deleting blog:", error);
                alert("Failed to delete blog post.");
            }
        }
    };

    if (loading) return <div className="container text-center mt-5"><div className="spinner-border" role="status"></div></div>;
    if (!blog) return <div className="container text-center mt-5"><h3>Blog not found</h3></div>;

    const isAuthorOrAdmin = user && (user.id === blog.author?._id || user.role === 'SUPER_ADMIN');

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Link to="/blog" className="text-decoration-none text-muted mb-4 d-inline-block fw-semibold">
                        &larr; Back to Blogs
                    </Link>

                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mb-4">
                            {blog.tags.map((tag, idx) => (
                                <span key={idx} className="badge bg-dark rounded-pill fw-normal px-3 py-2 me-2">{tag}</span>
                            ))}
                        </div>
                    )}

                    <h1 className="fw-bold display-4 mb-4">{blog.title}</h1>

                    <div className="d-flex justify-content-between align-items-center mb-4 pb-4 border-bottom">
                        <div className="d-flex align-items-center">
                            {blog.author?.avatarUrl ? (
                                <img src={blog.author.avatarUrl} alt={blog.author.username} className="rounded-circle me-3" style={{ width: "56px", height: "56px", objectFit: "cover" }} />
                            ) : (
                                <div className="bg-secondary rounded-circle me-3 d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: "56px", height: "56px", fontSize: "1.5rem" }}>
                                    {blog.author?.username?.charAt(0).toUpperCase() || 'A'}
                                </div>
                            )}
                            <div>
                                <h6 className="mb-1 fw-bold fs-5">{blog.author?.username || "Anonymous"}</h6>
                                <small className="text-muted fw-semibold">
                                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} &bull; {blog.readTime} min read
                                </small>
                            </div>
                        </div>

                        {isAuthorOrAdmin && (
                            <div className="dropdown">
                                <button className="btn btn-light rounded-circle shadow-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}>
                                    &#8942;
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3">
                                    <li><button className="dropdown-item text-danger fw-semibold" onClick={handleDelete}>Delete Post</button></li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {blog.imageUrl && (
                        <img src={blog.imageUrl} alt={blog.title} className="img-fluid rounded-4 mb-5 shadow-sm" style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }} />
                    )}

                    <div className="blog-content fs-5 text-dark" style={{ lineHeight: "1.9", whiteSpace: "pre-wrap" }}>
                        {blog.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
