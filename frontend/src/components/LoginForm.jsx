import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            await login({ email, password }); // Login
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            New account?{" "}
                            <a href="/register" className="text-blue-400">
                                register
                            </a>
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
