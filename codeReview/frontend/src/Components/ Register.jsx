import { useState } from "react";
import axios from "axios";

function Register({ setUser, setShowRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/ai/get-review",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      alert("Registration Successful ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
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
        onSubmit={handleRegister}
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "10px",
          background: "#1f2937",
        }}
      >
        <h2 style={{ color: "white", textAlign: "center" }}>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "20px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
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
          Register
        </button>

        <p
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Already have an account?{" "}
          <span
            style={{ color: "skyblue", cursor: "pointer" }}
            onClick={() => setShowRegister(false)}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;