import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from './../middleware/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Set loading to false after initial check
    }, []);

    const login = async (credentials) => {
        const userData = await axiosInstance.post("/api/auth/login", credentials);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
    };

    const register = async (credentials) => {
        const userData = await axiosInstance.post("/api/auth/register", credentials);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
        localStorage.setItem("user", JSON.stringify(updatedUserData));
    };

    const value = {
        user,
        login,
        register,
        logout,
        updateUser,
        loading, // Expose loading state
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
