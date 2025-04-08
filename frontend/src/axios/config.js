import axios from "axios";

const partyFetch = axios.create({
    baseURL: "https://party-project-backend.vercel.app/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default partyFetch;