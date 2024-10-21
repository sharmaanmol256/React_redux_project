import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: "application/json",
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjNmYWYwM2RmZTEzYzk0NTg5ZTllY2M0ZDZlMjYxZiIsIm5iZiI6MTcyOTUyOTA1NC4xNDc3OTMsInN1YiI6IjY2ZDcyYTBkNTdiM2Y1YTVjOWY3MTQ2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LPu751BCwI55N9vNVDP8AEBNM_o4A9U31Oc779mHC-A'
}});

export default instance;
