import axios from "axios";

// we have to set the base url for the backend
const api = axios.create({
    baseURL: "https://college-management-app-p4zy.onrender.com/api/",
    headers: {
        "Content-Type": "application/json",
    },
})

export default api;