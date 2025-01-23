import axios from "axios";

// we have to set the base url for the backend
const api = axios.create({
    baseURL: "http://localhost:5001/api/",
    headers: {
        "Content-Type": "application/json",
    },
})

export default api;