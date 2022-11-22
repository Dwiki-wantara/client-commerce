import axios from "axios";

// buat base url untuk deploy dengan netify
export const API = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

// buat base url untuk local
// export const API = axios.create({
//   baseURL: "http://localhost:5000/api/v1/",
// });

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin["Authorization"];
  }
};
