import styles from "./Login.module.css";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // Import jwt-decode to decode the JWT token
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const server = process.env.REACT_APP_SERVER_URL;
  const { UserLogin, UserLogout, userState } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({
      email,

      password,
    });
    alert(server);

    try {
      const res = await axios.post(
        `${server}/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("The result is");
      console.log(res);
      const token = res.data;
      localStorage.setItem("authToken", token);
      const decoded_data = jwtDecode(token);
      const currentUser = {
        user_name: decoded_data.user_name,
        user_id: decoded_data.user_id,
        role: decoded_data.role,
        token: token,
      };
      UserLogin(currentUser);
      console.log(userState);
      setEmail("");

      setPassword("");
      localStorage.setItem("name", currentUser.user_name);
      localStorage.setItem("role", currentUser.role);
      localStorage.setItem("user_id", currentUser.user_id);
      localStorage.setItem("token", currentUser.token);
      navigate("/");
    } catch (e) {
      alert(e);
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    // Decode the JWT token to extract user information
    // Handle the user information after successful login
    alert("bro");
  };

  const handleGoogleError = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <>
      <div className={styles.SignUp}>
        <h4>Join Hire.</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.button}>
            Join Hire.
          </button>
        </form>
        <div className={styles.or}>or</div>{" "}
        {/* Optional: To separate the buttons visually */}
        {/* Google Login Button */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleError}
          clientId={process.env.REACT_APP_CLIENT_ID}
          scope="profile email" // Add the desired scopes here
        />
      </div>
    </>
  );
}
