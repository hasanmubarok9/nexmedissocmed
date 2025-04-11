import axios from "axios";

console.log("nilai env: ", process.env.NEXT_PUBLIC_API_URL);

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;

