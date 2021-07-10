import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import LoggedInChecker from "./components/LoggedInChecker";
//
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <Router>
        <Navbar
          loggedIn={loggedIn}
          username={username}
          setLoggedIn={setLoggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Todo
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setUsername={setUsername}
            />
          </Route>
          <Route path="/login">
            <Login setLoggedIn={setLoggedIn} />
          </Route>
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
