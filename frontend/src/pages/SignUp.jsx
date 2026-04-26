import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../apiClient";

function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "HUNTER",
        avatarUrl: "",
        bio: ""
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setError("");
        setIsSubmitting(true);

        try {
            await axiosClient.post("/users", formData);
            setFormData({ 
                username: "", 
                email: "", 
                password: "",
                role: "HUNTER",
                avatarUrl: "",
                bio: ""
            });
            setMessage("Signup successful. Redirecting to login...");
            setTimeout(() => navigate("/login"), 1200);
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="row justify-content-center mt-5 mb-5">
            <div className="col-md-8 col-lg-6">
                <div className="card shadow-sm p-4 glass-card">
                    <h3 className="text-center mb-4">Create Account</h3>
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Role</label>
                                <select
                                    name="role"
                                    className="form-select"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="HUNTER">Hunter</option>
                                    <option value="COMPANY_ADMIN">Company Admin</option>
                                </select>
                            </div>
                            <div className="col-12">
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
                            <div className="col-12">
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
                            <div className="col-12">
                                <label className="form-label">Avatar URL (Optional)</label>
                                <input
                                    type="text"
                                    name="avatarUrl"
                                    className="form-control"
                                    placeholder="https://example.com/avatar.png"
                                    value={formData.avatarUrl}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Bio (Optional)</label>
                                <textarea
                                    name="bio"
                                    className="form-control"
                                    rows="3"
                                    value={formData.bio}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark w-100 mt-4" disabled={isSubmitting}>
                            {isSubmitting ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                    <div className="mt-3 text-center">
                        <Link to="/login">Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

