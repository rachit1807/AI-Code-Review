import { useState } from "react";
import axios from "axios";

function Login({ setUser, setShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || ""}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      alert("Login Successful ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111827",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "10px",
          background: "#1f2937",
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Don't have an account?{" "}
          <span
            style={{ color: "skyblue", cursor: "pointer" }}
            onClick={() => setShowRegister(true)}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
