import { useState, useEffect } from "react";
import "./App.css";
import DatePicker from "./components/DatePicker";
import Log from "./components/Hours.jsx";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DisplayUser from "./components/DisplayUser";

import hourService from "./services/hourService.js";
import { setHours } from "./reducers/hourReducer.jsx";
import { useDispatch, useSelector } from "react-redux";
import userService from "./services/userService.js";
import { setUser } from "./reducers/userReducer.jsx";
import loginService from "./services/loginService.js";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // login

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogin = () => {
    try {
      loginService.login(login).then((user) => {
        dispatch(setUser(user));
        window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      });
      setLogin({
        username: "",
        password: "",
      });
    } catch (err) {
      setError("Invalid username or password");
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleSignup = () => {
    userService.addUser(signup).then(() => {
      setLogin({
        username: "",
        password: "",
      });
      setSignup({
        name: "",
        username: "",
        password: "",
      });
      setIsSigningUp(false);
    });
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      return;
    }
    dispatch(setUser(null));
  }, []);

  useEffect(() => {
    if (user) {
      hourService.getHours().then((hours) => {
        hours && dispatch(setHours(hours));
      });
    }
  }, [user]);

  return (
    <Router>
      <h1>Hours</h1>
      {!user ? (
        !isSigningUp ? (
          <Login
            login={login}
            setLogin={setLogin}
            handleLogin={handleLogin}
            error={error}
            setIsSigningUp={setIsSigningUp}
          />
        ) : (
          <Routes>
            <Route
              path="/signup"
              element={
                <Signup
                  signup={signup}
                  setSignup={setSignup}
                  setIsSigningUp={setIsSigningUp}
                  handleSignup={handleSignup}
                  error={error}
                />
              }
            />
          </Routes>
        )
      ) : ""}
      {user ? <Dashboard user={user} /> : ""}
    </Router>
  );
}

export default App;
