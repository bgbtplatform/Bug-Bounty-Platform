import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../apiClient';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage('');
        setError(false);
        setIsSubmitting(true);
        try {
            let res = await axiosClient.post('/users/login', formData);
            let data = res.data;
            login(data);
            setError(false);
            setFormData({ email: '', password: '' });
            navigate('/');
        } catch (err) {
            setError(true);
            setMessage(err?.response?.data?.message || 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    }

    const displayFont = {
        fontFamily: 'Georgia, "Times New Roman", serif',
        letterSpacing: "-0.03em",
    };

    return (
        <div className="py-5" style={{ background: "#f8f5ef", minHeight: "calc(100vh - 100px)" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div 
                            className="rounded-4 p-4 p-lg-5"
                            style={{ 
                                background: "#ffffff", 
                                border: "1px solid #ece6da",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                            }}
                        >
                            <span
                                className="d-inline-block px-3 py-2 rounded-pill mb-4"
                                style={{
                                    background: "#111827",
                                    color: "#ffffff",
                                    fontSize: "0.75rem",
                                    letterSpacing: "0.06em",
                                    fontWeight: "600"
                                }}
                            >
                                WELCOME BACK
                            </span>

                            <h2 
                                className="fw-bold mb-4"
                                style={{ 
                                    ...displayFont,
                                    fontSize: "clamp(2rem, 4vw, 2.8rem)",
                                    color: "#111827" 
                                }}
                            >
                                Login to BugSeek
                            </h2>

                            {error && <div className="alert alert-danger rounded-3 small mb-4">{message}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label 
                                        className="form-label small fw-semibold text-uppercase"
                                        style={{ color: "#6b7280", letterSpacing: "0.05em" }}
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control rounded-3 p-3"
                                        style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label 
                                        className="form-label small fw-semibold text-uppercase"
                                        style={{ color: "#6b7280", letterSpacing: "0.05em" }}
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control rounded-3 p-3"
                                        style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn w-100 py-3 mt-2 rounded-3 fw-bold" 
                                    style={{ background: "#111827", color: "#ffffff" }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                            
                            <div className="mt-4 pt-4 border-top text-center">
                                <p className="text-muted small mb-0">
                                    Don't have an account? <Link to="/signup" className="fw-bold" style={{ color: "#e85d3f", textDecoration: "none" }}>Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
