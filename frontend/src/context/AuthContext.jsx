import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../apiClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Check if user is logged in
        axiosClient.get("/users/current")
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const login = async (email, password) => {
        const res = await axiosClient.post("/users/login", { email, password });
        setUser(res.data);
        return res.data;
    };

    const logout = async () => {
        await axiosClient.get("/users/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
