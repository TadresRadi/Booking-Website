import React from "react";
import { useEffect } from "react";
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from "mdb-react-ui-kit";
import styles from "./Login.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login() {


  // This useEffect will check localStorage when the component is loaded
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      document.getElementById("usernameInput").value = storedUsername;
      document.getElementById("rememberMe").checked = true; // Check Remember Me if username is stored
    }
  }, []);






  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = document.getElementById("usernameInput").value
    const Password = document.getElementById("passwordInput").value
    const RememberMe = document.getElementById("rememberMe").checked

  
  try {
    const response = await fetch("http://127.0.0.1:5000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: Password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Login successful", result);
        // If Remember Me is checked, store the username in localStorage
        if (RememberMe) {
          localStorage.setItem("username", username);
        } else {
          localStorage.removeItem("username"); // Remove the username if Remember Me is unchecked
        }
    } else {
      console.error("Login failed", result);
      alert("Login failed: " + result.detail || "Invalid email or password");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred while trying to login. Please try again.");
  }

  console.log("Form submitted");
};
return (
  < div className={styles.body_like}>
    <div className={`container ${styles.loginWrapper}`}>
      <div className="row justify-content-center  ">
        <div className={` col-sm-8  col-md-3 col-lg-5  p-md-4 p-3  m-4 d-flex flex-column align-items-center ${styles.LoginContainer}`}>
          <h2 className={styles.textCenter}>Log in</h2>

          <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
            <MDBInput
              wrapperClass="mb-4 w-100"
              label="Username"
              id="usernameInput"
              type="text"
              size="lg"
              aria-label="Enter your username"
            />

            <MDBInput
              wrapperClass="mb-4 w-100"
              label="Password"
              id="passwordInput"
              type="password"
              size="lg"
              aria-label="Enter your password"
            />

            <div className="d-flex justify-content-between mb-4 w-100 px-2">
              <MDBCheckbox name="rememberMe" id="rememberMe" label="Remember me" />
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className={styles.Loginbtn}>
              Log In
            </button>
          </form>

          <div className="text-center mt-3">
            <p>Not a member? <a href="/register">Register</a></p>
           
          </div>
        </div>
      </div>
    </div>



  </div>

);
}