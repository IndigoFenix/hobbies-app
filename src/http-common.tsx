import axios from "axios";
export default axios.create({
  baseURL: "https://hobbies-backend.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});