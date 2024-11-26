import { getCookie } from "@/lib/cookieUtils";
import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getCookie('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            toast.error("Sesion expirada, por favor inicie sesion nuevamente");
            redirect("/auth/login");
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
