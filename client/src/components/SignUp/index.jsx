import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
const SignUp = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, password);
    axios
      .post("http://127.0.0.1:8000/register/", {
        username,
        email,
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
      <div className="row">
        <div className="col-12 my-auto">
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
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="email"
                onChange={(e) => setEmail(e.target.value)}
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
              Create Account
            </button>
            <div className="p-2 text-center">
              <Link to="/login">Already have a account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
