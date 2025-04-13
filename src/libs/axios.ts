import axios from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return config;
    },
    (error: any) => {        
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: any) => {
        if (error.response?.status === 401) {
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    }
);


export default instance;

