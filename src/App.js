import React, { createContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// CSS
import "./App.css";
// Components
import NavBar from "./components/NavBar";
import Register from "./views/Register";
import Login from "./views/Login";
import Home from "./views/Home";
// Context
export const UserContext = createContext();
// URL
export const API_URL = "https://blooming-retreat-37691.herokuapp.com";
/* export const API_URL = "http://localhost:3000"; */

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <UserContext.Provider
          value={{ email, setEmail, password, setPassword }}
        >
          <Route exact path="/" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/contacts" component={Home} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
