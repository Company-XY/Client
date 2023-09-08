import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ClientRegister from "../pages/Register/clientRegister";
import FreelancerRegister from "../pages/Register/freelancerRegister";
import Dashboard from "../pages/Dashboard/dashboard";
//import Header from "../components/Header/Header";
import Blog from "../pages/Blog/Blog";

function Routers() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/client" element={<ClientRegister />} />
      <Route path="/register/freelancer" element={<FreelancerRegister />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}

export default Routers;
