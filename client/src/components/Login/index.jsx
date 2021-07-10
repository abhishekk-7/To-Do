import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import LoggedInChecker from "../LoggedInChecker";

import "./index.css";
const Login = ({ setLoggedIn }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/login/", {
        username,
        password,
      })
      .then(
        (response) => {
          const data = response.data;
          localStorage.setItem("token", data.token);
          history.push("/");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="container login">
      <LoggedInChecker setLoggedIn={setLoggedIn} />
      <div className="row">
        <div className="col-12 my-auto">
          <img src="/img/image.png" alt="" />
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                aria-describedby="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div className="p-3 text-center">
              <Link to="/signup">Create a account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
