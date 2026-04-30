import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../apiClient';

const SuperAdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await axiosClient.post('/admin/login', { email, password });
            if (res.data.success) {
                // Force reload to update AuthContext and redirect to dashboard
                window.location.href = '/admin-nexus-90210';
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid bg-dark min-vh-100 d-flex align-items-center justify-content-center" style={{marginTop: '-80px', paddingTop: '80px'}}>
            <div className="card shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '450px' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-5">
                        <div className="bg-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: '80px', height: '80px' }}>
                            <span style={{ fontSize: '2.5rem' }}>🛡️</span>
                        </div>
                        <h3 className="fw-bold">Nexus Access</h3>
                        <p className="text-muted small text-uppercase fw-semibold" style={{letterSpacing: '1px'}}>Super Admin Clearance Required</p>
                    </div>
                    
                    {error && <div className="alert alert-danger rounded-3 small fw-bold text-center">{error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label fw-bold text-muted small text-uppercase">Admin Email</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg bg-light border-0" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                placeholder="sysadmin@bugnest.com"
                            />
                        </div>
                        <div className="mb-5">
                            <label className="form-label fw-bold text-muted small text-uppercase">Passphrase</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg bg-light border-0" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                placeholder="••••••••••••"
                            />
                        </div>
                        <button type="submit" className="btn btn-danger w-100 fw-bold py-3 text-uppercase shadow-sm" disabled={loading}>
                            {loading ? 'Authenticating...' : 'Initialize Override'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminLogin;
