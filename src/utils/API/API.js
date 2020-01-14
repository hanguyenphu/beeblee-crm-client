import axios from "axios";

let authToken = "";

if (localStorage.getItem("token")) {
    authToken = localStorage.getItem("token");

}

export default axios.create({
    baseURL: "http://localhost:3000",
    headers: { common: { Authorization: `Bearer ${authToken}` } }
});

