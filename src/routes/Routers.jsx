import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ClientRegister from "../pages/Register/clientRegister";
import FreelancerRegister from "../pages/Register/freelancerRegister";
import Dashboard from "../pages/Dashboard/dashboard";
import Blog from "../pages/Blog/Blog";
import PostProject from "../pages/Dashboard/Client/Dashboard/postProject";
import BookConsultation from "../pages/Dashboard/Client/Dashboard/bookConsultation";
import FillDetails from "../pages/Dashboard/Client/Dashboard/guidanceDetails";
import Call from "../pages/Dashboard/Client/Dashboard/call";
import Reset from "../pages/Reset";
import Password from "../pages/Password";
import Admins from "../pages/Dashboard/Admins/Admins";
import Review from "../pages/Dashboard/Client/Dashboard/Review";
import JobPage from "../pages/Dashboard/Client/Dashboard/jobPage";
import JobPage2 from "../pages/Dashboard/Freelancer/Dashboard/JobPage";
import Deposit from "../pages/Dashboard/Client/Dashboard/deposit";
import Profile2 from "../pages/Dashboard/Freelancer/Profile/getProfile";
import Withdraw from "../pages/Dashboard/Freelancer/Dashboard/withdraw";
import UpdateProfile from "../pages/Dashboard/Client/Profile/updateProfile";
import ProfileUpdate from "../pages/Dashboard/Freelancer/Profile/profileUpdate";
import FreelancerProfilePage from "../pages/Dashboard/Freelancer/Profile/profile/index";

function Routers() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/client" element={<ClientRegister />} />
      <Route path="/register/freelancer" element={<FreelancerRegister />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/client/profile" element={<UpdateProfile />} />
      <Route path="/freelancer/profile" element={<ProfileUpdate />} />
      <Route path="/dashboard/admin" element={<Admins />} />
      <Route path="/dashboard/client/post" element={<PostProject />} />
      <Route path="/dashboard/client/book" element={<BookConsultation />} />
      <Route path="/dashboard/client/book/details" element={<FillDetails />} />
      <Route path="/dashboard/client/book/call" element={<Call />} />
      <Route path="/dashboard/client/review" element={<Review />} />
      <Route path="/dashboard/job/:jobId" element={<JobPage2 />} />
      <Route path="/dashboard/client/job/:jobId" element={<JobPage />} />
      <Route path="/dashboard/freelancer/profile/:id" element={<Profile2 />} />
      <Route path="/freelancer/:id" element={<FreelancerProfilePage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/password/:token" element={<Password />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
    </Routes>
  );
}

export default Routers;
