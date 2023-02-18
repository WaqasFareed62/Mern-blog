import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/register";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import IndexPages from "./Pages/IndexPages";
import { UserContextProvider } from "./userContext";
import CreatePost from "./components/createPost/createPost";
import ContentPage from "./components/contentPage/ContentPage";
import Edit from "./components/Edit/Edit";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<ContentPage />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
