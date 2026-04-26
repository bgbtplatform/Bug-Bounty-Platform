import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../apiClient";

export const AuthContext = createContext()

export function AuthProvider({ children }){
    const [ user, setUser ] = useState(false)

    const login = (userData) => setUser(userData)
    const logout = () => setUser(false)

    const getUser = async() => {
        try {
            let res = await axiosClient.get("/users/current")
            let data = res.data
            setUser(data)
        } catch (error) {
            console.error("Auth initialization failed:", error.response?.data || error.message);
            setUser(false);
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}
