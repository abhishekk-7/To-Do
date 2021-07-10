import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import endpoints from "../endpoints";
import axios from "axios";

const LoggedInChecker = ({ setLoggedIn }) => {
  const history = useHistory();

  useEffect(() => {
    axios
      .post(
        endpoints.loggedIn,
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        history.push("/");
        setLoggedIn(true);
      })
      .catch(function (error) {
        localStorage.removeItem("token");
        history.push("/login");
        setLoggedIn(false);
      });
  }, []);
  return "";
};
export default LoggedInChecker;
