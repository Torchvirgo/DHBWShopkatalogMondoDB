import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080", //URL der API  die aufgerufen werden soll
  headers: {
    "Content-type": "application/json"
  }
});