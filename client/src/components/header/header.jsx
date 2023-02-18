import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../userContext";

import "./header.css";

function Header() {
  const { userInfo, setUserinfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserinfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserinfo(null);
  }
  const username = userInfo?.username;
  return (
    <header>
      <Link className="logo" to={"/"}>
        MyBlog
      </Link>

      <nav>
        {username && (
          <>
            <Link to={"/create"}>Create New Post</Link>
            <Link to={logout}>Logout</Link>
          </>
        )}
        {!username && (
          <>
            <Link className="link" to={"/login"}>
              Login
            </Link>
            <Link className="link" to={"/register"}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
