import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            await register({ email, password }); // Register
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="max-w-md w-full p-6 border rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
                <div className="min-h-[1.5rem]">{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-md" />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Already account?{" "}
                            <a href="/login" className="text-blue-400">
                                login
                            </a>
                        </label>
                    </div>
                    <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
