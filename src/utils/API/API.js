import axios from "axios";

let authToken = "";

if (localStorage.getItem("token")) {
    authToken = localStorage.getItem("token");

}

export default axios.create({
    baseURL: "https://beeblee-crm-node.herokuapp.com",
    headers: { common: { Authorization: `Bearer ${authToken}` } }
});

