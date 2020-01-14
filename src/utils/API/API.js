import axios from "axios";

let authToken = "";

if (localStorage.getItem("token")) {
    authToken = localStorage.getItem("token");
   
}

export default axios.create({
    baseURL: "http://10.0.0.51:3000/",
    headers: { common: { Authorization: `Bearer ${authToken}` } }
});

