import axios from "axios";
export default axios.create({
  baseURL: "http://ec2-13-58-147-206.us-east-2.compute.amazonaws.com:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});