import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./container/Home";
import userInfoGetter from "./scripts/userInfoGetter";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = userInfoGetter;
    if (!user) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
