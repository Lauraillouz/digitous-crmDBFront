import React, { useContext } from "react";
import { Link } from "react-router-dom";
// Context
import { UserContext } from "../App";
// URL
import { API_URL } from "../App";

const passwordSchema = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

const Register = () => {
  const { email, setEmail, password, setPassword } = useContext(UserContext);

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
      fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } else {
      alert("Password invalid");
    }
  };

  return (
    <div>
      <h2>Welcome in crmDB!</h2>
      <p>
        If you already have an account, please{" "}
        <Link to="/login">login here</Link>
      </p>
      <p>Or create your account:</p>
      <form>
        <div>
          <label>Email</label>
          <input type="email" onChange={handleEmail} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" onChange={handlePassword} />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
