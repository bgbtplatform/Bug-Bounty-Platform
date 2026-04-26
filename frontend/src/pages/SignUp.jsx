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

    const displayFont = {
        fontFamily: 'Georgia, "Times New Roman", serif',
        letterSpacing: "-0.03em",
    };

    return (
        <div className="py-5" style={{ background: "#f8f5ef", minHeight: "calc(100vh - 100px)" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
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
                                START YOUR JOURNEY
                            </span>

                            <h2 
                                className="fw-bold mb-4"
                                style={{ 
                                    ...displayFont,
                                    fontSize: "clamp(2rem, 4vw, 2.8rem)",
                                    color: "#111827" 
                                }}
                            >
                                Create your BugSeek account
                            </h2>

                            {message && <div className="alert alert-success rounded-3 small mb-4">{message}</div>}
                            {error && <div className="alert alert-danger rounded-3 small mb-4">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label 
                                            className="form-label small fw-semibold text-uppercase"
                                            style={{ color: "#6b7280", letterSpacing: "0.05em" }}
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control rounded-3 p-3"
                                            style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label 
                                            className="form-label small fw-semibold text-uppercase"
                                            style={{ color: "#6b7280", letterSpacing: "0.05em" }}
                                        >
                                            I am a...
                                        </label>
                                        <select
                                            name="role"
                                            className="form-select rounded-3 p-3"
                                            style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
                                            value={formData.role}
                                            onChange={handleChange}
                                        >
                                            <option value="HUNTER">Security Researcher (Hunter)</option>
                                            <option value="COMPANY_ADMIN">Company Administrator</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
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
                                    <div className="col-12">
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
                                    <div className="col-12">
                                        <label 
                                            className="form-label small fw-semibold text-uppercase"
                                            style={{ color: "#6b7280", letterSpacing: "0.05em" }}
                                        >
                                            Avatar URL (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="avatarUrl"
                                            className="form-control rounded-3 p-3"
                                            style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
                                            placeholder="https://example.com/avatar.png"
                                            value={formData.avatarUrl}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label 
                                            className="form-label small fw-semibold text-uppercase"
                                            style={{ color: "#6b7280", letterSpacing: "0.05em" }}
                                        >
                                            Bio (Optional)
                                        </label>
                                        <textarea
                                            name="bio"
                                            className="form-control rounded-3 p-3"
                                            style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
                                            rows="3"
                                            placeholder="Tell us about yourself..."
                                            value={formData.bio}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn w-100 py-3 mt-4 rounded-3 fw-bold" 
                                    style={{ background: "#111827", color: "#ffffff" }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Creating Account..." : "Create Account"}
                                </button>
                            </form>
                            
                            <div className="mt-4 pt-4 border-top text-center">
                                <p className="text-muted small mb-0">
                                    Already have an account? <Link to="/login" className="fw-bold" style={{ color: "#e85d3f", textDecoration: "none" }}>Login</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
