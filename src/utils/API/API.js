import axios from "axios";

let authToken = "";

if (localStorage.getItem("token")) {
   authToken = localStorage.getItem("token");
}


export default axios.create({
  baseURL: "https://beeblee-crm-node.herokuapp.com",
  // baseURL: "https://beeblee-example-node.herokuapp.com",
  // baseURL: "http://localhost:3000",
  headers: { common: { Authorization: `Bearer ${authToken}` } }
});
