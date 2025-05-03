import React from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from "mdb-react-ui-kit";
import styles from "./Login.module.css";

export function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted"); // Add authentication logic here
  };

  return (
    <MDBContainer
      className={`p-3 my-5 d-flex flex-column align-items-center ${styles.container}`}
    >
      <h2 className={styles.textCenter}>Log in</h2>

      <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
        <MDBInput
          wrapperClass="mb-4 w-100"
          label="Email address"
          id="emailInput"
          type="email"
          size="lg"
          aria-label="Enter your email"
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
        <MDBBtn type="submit" >
          Sign in
        </MDBBtn>
      </form>

      <div className="text-center">
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
    </MDBContainer>
  );
}
