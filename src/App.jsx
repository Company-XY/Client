import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userIsLoggedIn = localStorage.getItem("user") !== null;
      setIsLoggedIn(userIsLoggedIn);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    document.title = isLoggedIn ? "Dashboard | Assist Africa" : "Assist Africa";
  }, [isLoggedIn]);
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
