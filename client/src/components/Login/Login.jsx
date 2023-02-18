import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import { UserContext } from "../../userContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserinfo } = useContext(UserContext);
  async function loguser(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserinfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Wrong UserName and Password");
    }
  }
  if (redirect === true) {
    return <Navigate to="/" />;
  }

  return (
    <form className="login-form" onSubmit={loguser}>
      <h1>Login</h1>
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
      <button className="btn">Login</button>
    </form>
  );
};

export default LoginPage;
