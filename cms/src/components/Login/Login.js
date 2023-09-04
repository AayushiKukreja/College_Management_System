import React from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  function Submit(e) {
    e.preventDefault();
    const fData = new FormData();
    if (email === "" || password === "") {
      alert("Please Fill Both The Fields!!!");
    } else {
      fData.append("email", email);
      fData.append("password", password);
      console.log(fData.append);
      localStorage.setItem("email", email);

      axios({
        method: "post",
        url: "http://localhost:8080/db/login.php/",
        data: fData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then(function (response) {
          console.log(response.data);
          if (response.data == "Login Successful!!Redirecting...") {
            alert("Login Successful!!Redirecting...");
            navigate("/home");
          } else if (response.data == "Welcome HOD!!!!") {
            alert("Welcome HOD!!!");
            navigate("/home");
          } else if (response.data == "Successfully Registered!!") {
            alert(response.data);
            navigate("/home");
          } else {
            alert(response.data);
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  }

  return (
    <div className="con-tainer">
      <div class="img">
        <img className="wave" src="./wave.png" />
      </div>

      <div className="login-content">
        <form>
          <img src="./login.png" alt="profile" />
          <h1>Login</h1>
          <div className="input-div one">
            <div className="i">
              <FontAwesomeIcon className="icon" icon="fa-solid fa-user" />
            </div>
            <div className="div">
              <input
                autoComplete="off"
                required
                type="email"
                name="email"
                placeholder="Email"
                class="input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="input-div pass">
            <div className="i">
              <FontAwesomeIcon icon="fa-solid fa-lock" />
            </div>
            <div class="div">
              <input
                autoComplete="off"
                required
                type="password"
                name="password"
                placeholder="Password"
                class="input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <motion.input
            type="submit"
            name="submit"
            class="btn"
            value="Login"
            onClick={(e) => {
              Submit(e);
            }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          ></motion.input>
        </form>
      </div>
    </div>
  );
}
export default Login;
