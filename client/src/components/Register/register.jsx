import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
   
    if (response.status === 200) {
      alert("Registration sucess");
    } else {
      
      alert("registration fail"); 
    }
  }
  return (
    <form className="login-form"  onSubmit={register}>
      <h1>Register</h1>
      <input
        className="user"
        type="text"
        placeholder="Enter UserName"
        autoComplete="off"
        value={username}
        onChange={(ev) => {
          setUsername(ev.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(ev) => {
          setPassword(ev.target.value);
        }}
      />
      <button className="btn">Register</button>
    </form>
  );
}

export default Register;
