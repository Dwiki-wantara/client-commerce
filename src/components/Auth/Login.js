import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";

import { API } from "../../config/api";

export default function Login() {
  let navigate = useNavigate();
  document.title = "Login";
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);

      // console.log(response);

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.status === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="bg-secondary p-4">
        <div className="d-flex justify-content-center" style={{color:"white",fontSize:"36px",lineHeight:"49px",fontWeight:"700",marginBottom:"3px"}}>
          Login
        </div>
        
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)} style={{width:"400px"}}>
          <div className="mt-3">
            <div className="d-flex">
              <input type="email" placeholder="Email" style={{width:"100%"}} value={email} name="email" onChange={handleChange} className="px-3 py-2 mt-3"/>
            </div>
            <div className="d-flex">
              <input type="password" placeholder="Password" style={{width:"100%"}}  value={password}  name="password"  onChange={handleChange}  className="px-3 py-2 mt-3"/>
            </div>
          </div>
          <div className="d-grid gap-2 mt-5">
            <button className="btn bg-white" style={{fontFamily:"cursive"}}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
