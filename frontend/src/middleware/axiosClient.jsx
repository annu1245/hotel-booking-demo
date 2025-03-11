import axios from "axios";

const LOGIN_API_URL = "auth/login";

/**
 * Create axios instance
 */
const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

/**
 * Request interceptor
 */
axiosInstance.interceptors.request.use(
    (config) => {
        let user = localStorage.getItem("user") || "{}";
        const { token } = JSON.parse(user);
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Response interceptor
 */
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && originalRequest.url !== LOGIN_API_URL) {
            window.location.href = '/logout';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

