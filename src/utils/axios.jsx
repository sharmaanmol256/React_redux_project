import axios from "axios";

if (!import.meta.env.VITE_REACT_APP_TOKEN) throw new Error("Access Token is undefined")

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_REACT_APP_TOKEN,
    },
});

export default instance;
