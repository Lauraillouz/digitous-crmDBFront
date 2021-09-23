import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
// Context
import { UserContext } from "../App";
// URL
import { API_URL, API_URL_DEV } from "../config";

const passwordSchema = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const Login = () => {
  const { email, setEmail, password, setPassword, isNewUser, setCanLogin } =
    useContext(UserContext);
  const history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isPassWordValid = passwordSchema.test(password);

    if (isPassWordValid) {
      let URL;
      if (process.env.NODE_ENV === "development") {
        URL = API_URL_DEV;
      } else {
        URL = API_URL;
      }

      fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "Here is your delicious cookie!") {
            setCanLogin(true);
            history.push("/contacts");
          } else {
            alert("Something went wrong");
          }
        });
    } else {
      alert("Password invalid");
    }
  };

  return (
    <div className="regularPadding">
      {isNewUser ? (
        <p className="mb1">
          Congratulations! Your account has been successfully created. Now,
          please login:
        </p>
      ) : (
        <div>
          <p className="mb1">
            If you don't have an account yet, please{" "}
            <Link to="/">create one here</Link>
          </p>
          <p className="mb1">Or login here:</p>
        </div>
      )}

      <form className="mt2 flex justifyBetween">
        <div>
          <label className="me1">Email: </label>
          <input type="email" onChange={handleEmail} />
        </div>
        <div>
          <label className="me1">Password: </label>
          <input type="password" onChange={handlePassword} />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
