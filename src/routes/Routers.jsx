import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ClientRegister from "../pages/Register/clientRegister";
import FreelancerRegister from "../pages/Register/freelancerRegister";
import Dashboard from "../pages/Dashboard/dashboard";
//import Header from "../components/Header/Header";
import Blog from "../pages/Blog/Blog";
import PostProject from "../pages/Dashboard/Client/Dashboard/postProject";
import BookConsultation from "../pages/Dashboard/Client/Dashboard/bookConsultation";
import FillDetails from "../pages/Dashboard/Client/Dashboard/guidanceDetails";
import Call from "../pages/Dashboard/Client/Dashboard/call";
function Routers() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/client" element={<ClientRegister />} />
      <Route path="/register/freelancer" element={<FreelancerRegister />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/client/post" element={<PostProject />} />
      <Route path="/dashboard/client/book" element={<BookConsultation />} />
      <Route path="/dashboard/client/book/details" element={<FillDetails />} />
      <Route path="/dashboard/client/book/call" element={<Call />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}

export default Routers;
