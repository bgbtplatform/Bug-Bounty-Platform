import React, { useState, useEffect } from 'react';
import axiosClient from '../../apiClient';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.role !== 'SUPER_ADMIN') {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            try {
                const statsRes = await axiosClient.get('/admin/stats');
                if (statsRes.data.success) {
                    setStats(statsRes.data.data);
                }

                const usersRes = await axiosClient.get('/admin/users');
                if (usersRes.data.success) {
                    setUsers(usersRes.data.data);
                }

                const programsRes = await axiosClient.get('/admin/programs');
                if (programsRes.data.success) {
                    setPrograms(programsRes.data.data);
                }

                const reportsRes = await axiosClient.get('/admin/reports');
                if (reportsRes.data.success) {
                    setReports(reportsRes.data.data);
                }
            } catch (error) {
                console.error("Error fetching admin data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to completely ban/delete this user? This cannot be undone.")) {
            try {
                const res = await axiosClient.delete(`/admin/users/${id}`);
                if (res.data.success) {
                    setUsers(users.filter(u => u._id !== id));
                    alert("User deleted successfully.");
                }
            } catch (error) {
                alert("Failed to delete user.");
            }
        }
    };

    const handleUpdateProgramStatus = async (id, status) => {
        try {
            const res = await axiosClient.patch(`/admin/programs/${id}/status`, { status });
            if (res.data.success) {
                setPrograms(programs.map(p => p._id === id ? { ...p, status } : p));
            }
        } catch (error) {
            alert("Failed to update program status.");
        }
    };

    if (loading) return <div className="container text-center mt-5"><div className="spinner-border text-danger"></div></div>;

    return (
        <div className="container-fluid bg-light min-vh-100 py-5">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h1 className="fw-bold display-6 text-danger">Nexus Command Center</h1>
                    <span className="badge bg-danger fs-6 py-2 px-3 shadow-sm">SUPER ADMIN ACCESS</span>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 rounded-4 h-100 bg-white">
                            <div className="card-body p-4 text-center">
                                <h6 className="text-muted fw-bold text-uppercase mb-3">Total Users</h6>
                                <h2 className="display-4 fw-bold mb-0">{stats?.totalUsers || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 rounded-4 h-100 bg-white">
                            <div className="card-body p-4 text-center">
                                <h6 className="text-muted fw-bold text-uppercase mb-3">Total Hunters</h6>
                                <h2 className="display-4 fw-bold text-primary mb-0">{stats?.totalHunters || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 rounded-4 h-100 bg-white">
                            <div className="card-body p-4 text-center">
                                <h6 className="text-muted fw-bold text-uppercase mb-3">Total Reports</h6>
                                <h2 className="display-4 fw-bold text-warning mb-0">{stats?.totalReports || 0}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow-sm border-0 rounded-4 h-100 bg-white">
                            <div className="card-body p-4 text-center">
                                <h6 className="text-muted fw-bold text-uppercase mb-3">Resolved Reports</h6>
                                <h2 className="display-4 fw-bold text-success mb-0">{stats?.resolvedReports || 0}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
                        <ul className="nav nav-tabs border-bottom-0">
                            <li className="nav-item">
                                <button className={`nav-link fw-bold border-0 bg-transparent ${activeTab === 'overview' ? 'active text-danger border-bottom border-danger border-3' : 'text-muted'}`} onClick={() => setActiveTab('overview')} style={{borderRadius: 0}}>
                                    System Overview
                                </button>
                            </li>
                            <li className="nav-item ms-3">
                                <button className={`nav-link fw-bold border-0 bg-transparent ${activeTab === 'users' ? 'active text-danger border-bottom border-danger border-3' : 'text-muted'}`} onClick={() => setActiveTab('users')} style={{borderRadius: 0}}>
                                    User Management
                                </button>
                            </li>
                            <li className="nav-item ms-3">
                                <button className={`nav-link fw-bold border-0 bg-transparent ${activeTab === 'programs' ? 'active text-danger border-bottom border-danger border-3' : 'text-muted'}`} onClick={() => setActiveTab('programs')} style={{borderRadius: 0}}>
                                    Programs
                                </button>
                            </li>
                            <li className="nav-item ms-3">
                                <button className={`nav-link fw-bold border-0 bg-transparent ${activeTab === 'reports' ? 'active text-danger border-bottom border-danger border-3' : 'text-muted'}`} onClick={() => setActiveTab('reports')} style={{borderRadius: 0}}>
                                    Reports
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body p-4">
                        {activeTab === 'overview' && (
                            <div>
                                <h4 className="fw-bold mb-4">Platform Health</h4>
                                <p className="text-muted fs-5">All systems operational. The platform is currently tracking <strong className="text-dark">{stats?.totalPrograms || 0}</strong> active bounty programs.</p>
                                <div className="alert alert-danger border-0 rounded-3 mt-4">
                                    <h5 className="fw-bold">Security Notice</h5>
                                    <p className="mb-0">You are logged in with Super Admin privileges. Any actions taken here directly affect production data. Proceed with caution.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="border-0">User</th>
                                            <th className="border-0">Email</th>
                                            <th className="border-0">Role</th>
                                            <th className="border-0">Reputation</th>
                                            <th className="border-0 text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        {users.map(u => (
                                            <tr key={u._id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        {u.avatarUrl ? (
                                                            <img src={u.avatarUrl} alt={u.username} className="rounded-circle me-3" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                                        ) : (
                                                            <div className="bg-secondary rounded-circle me-3 d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '40px', height: '40px' }}>
                                                                {u.username?.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                        <span className="fw-bold">{u.username}</span>
                                                    </div>
                                                </td>
                                                <td className="text-muted">{u.email}</td>
                                                <td>
                                                    <span className={`badge ${u.role === 'SUPER_ADMIN' ? 'bg-danger' : u.role === 'COMPANY_ADMIN' ? 'bg-primary' : 'bg-dark'} rounded-pill px-3 py-2 fw-normal`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="fw-semibold">{u.reputation}</td>
                                                <td className="text-end">
                                                    {u.role !== 'SUPER_ADMIN' && (
                                                        <button className="btn btn-sm btn-outline-danger fw-semibold px-3" onClick={() => handleDeleteUser(u._id)}>
                                                            Ban User
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'programs' && (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="border-0">Title</th>
                                            <th className="border-0">Company</th>
                                            <th className="border-0">Status</th>
                                            <th className="border-0 text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        {programs.map(p => (
                                            <tr key={p._id}>
                                                <td className="fw-bold">{p.title}</td>
                                                <td>{p.companyId?.name || "Unknown"}</td>
                                                <td>
                                                    <span className={`badge ${p.status === 'ACTIVE' ? 'bg-success' : p.status === 'PAUSED' ? 'bg-warning' : 'bg-secondary'} rounded-pill px-3 py-2 fw-normal`}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="text-end">
                                                    {p.status === 'ACTIVE' ? (
                                                        <button className="btn btn-sm btn-outline-warning fw-semibold px-3" onClick={() => handleUpdateProgramStatus(p._id, 'PAUSED')}>Pause</button>
                                                    ) : (
                                                        <button className="btn btn-sm btn-outline-success fw-semibold px-3" onClick={() => handleUpdateProgramStatus(p._id, 'ACTIVE')}>Activate</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'reports' && (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="border-0">Title</th>
                                            <th className="border-0">Program</th>
                                            <th className="border-0">Hunter</th>
                                            <th className="border-0">Severity</th>
                                            <th className="border-0">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        {reports.map(r => (
                                            <tr key={r._id}>
                                                <td className="fw-semibold">{r.title}</td>
                                                <td>{r.programId?.title || "Unknown"}</td>
                                                <td>{r.hunterId?.username || "Unknown"}</td>
                                                <td>
                                                    <span className={`badge bg-${r.severity === 'CRITICAL' ? 'danger' : r.severity === 'HIGH' ? 'warning' : 'secondary'}`}>
                                                        {r.severity}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-light text-dark border">{r.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
