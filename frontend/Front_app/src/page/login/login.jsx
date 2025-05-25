import React, { useEffect } from "react";
import {
  MDBInput,
  MDBCheckbox
} from "mdb-react-ui-kit";
import styles from "./Login.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Login() {

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      document.getElementById("usernameInput").value = storedUsername;
      document.getElementById("rememberMe").checked = true;
    }
  }, []);

const handleSubmit = async (event) => {
  event.preventDefault();
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    console.log("Status:", response.status);
    const result = await response.json();
    console.log("Body:", result);
if (
  response.ok &&
  result.tokens &&
  result.tokens.access &&
  result.tokens.refresh
) {
  localStorage.setItem("access", result.tokens.access);
  localStorage.setItem("refresh", result.tokens.refresh);
  localStorage.setItem("username", username);
  window.location.href = "/home";
} else {
  alert(result.detail || result.message || "بيانات غير صحيحة");
  console.error("فشل تسجيل الدخول:", result);
}
  } catch (error) {
    alert("خطأ في الاتصال بالسيرفر");
    console.error("خطأ في الاتصال:", error);
  }
};
  return (
    <div className={styles.body_like}>
      <div className={`container ${styles.loginWrapper}`}>
        <div className="row justify-content-center">
          <div className={`col-sm-8 col-md-3 col-lg-5 p-md-4 p-3 m-4 d-flex flex-column align-items-center ${styles.LoginContainer}`}>
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

export default Login;