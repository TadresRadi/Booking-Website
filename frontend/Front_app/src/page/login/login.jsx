import React from "react";
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from "mdb-react-ui-kit";
import styles from "./Login.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login() {

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
      // Handle successful login (e.g., redirect to dashboard)
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
      <div className="row justify-content-center">
        <div className={` col-sm-8  col-md-3 col-lg-5  m-4 p-5 d-flex flex-column align-items-center ${styles.LoginContainer}`}>
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
            <p>or sign in with:</p>

            <div className="d-flex justify-content-between mx-auto" style={{ width: "40%" }}>
              <MDBBtn tag="a" color="none" className="m-1" style={{ color: "#3b5998" }}>
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn tag="a" color="none" className="m-1" style={{ color: "#db4437" }}>
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </div>



  </div>

);
}