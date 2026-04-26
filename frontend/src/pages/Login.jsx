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

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-6 col-lg-5">
                <div className="card shadow-sm p-4 glass-card">
                    <h3 className="text-center mb-4">Login</h3>
                    {error && <div className="alert alert-danger">{message}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <div className="mt-3 text-center">
                        <Link to="/signup">Don't have an account? Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
