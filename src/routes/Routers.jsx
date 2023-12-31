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
import Withdraw from "../pages/Dashboard/Freelancer/Dashboard/withdraw";
//Creating Client CreateProfile and Update Profile files
import CreateProfile from "../pages/Dashboard/Client/Profile/createProfile";
import UpdateProfile from "../pages/Dashboard/Client/Profile/updateProfile";
//Creating Freelancer CreateProfile and UpdateProfile files
import CreateProfile1 from "../pages/Dashboard/Freelancer/Profile/createProfile";
import UpdateProfile1 from "../pages/Dashboard/Freelancer/Profile/updateProfile";
import FreelancerProfilePage from "../pages/Dashboard/Freelancer/Profile/profile/index";
import VerifyEmail from "../pages/Dashboard/Freelancer/Profile/profile/verifyEmail";
import VerifyPhone from "../pages/Dashboard/Freelancer/Profile/profile/verifyPhone";
import Trial from "../pages/Trial";
import Error404 from "../pages/Error404";

function Routers() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/client" element={<ClientRegister />} />
      <Route path="/register/freelancer" element={<FreelancerRegister />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/client/profile" element={<CreateProfile />} />
      <Route path="/client/update_profile" element={<Error404 />} />
      <Route path="/freelancer/profile" element={<CreateProfile1 />} />
      <Route path="/freelancer/update_profile" element={<Error404 />} />
      <Route path="/dashboard/admin" element={<Admins />} />
      <Route path="/dashboard/client/post" element={<PostProject />} />
      <Route path="/dashboard/client/book" element={<BookConsultation />} />
      <Route path="/dashboard/client/book/details" element={<FillDetails />} />
      <Route path="/dashboard/client/book/call" element={<Call />} />
      <Route path="/dashboard/client/review" element={<Review />} />
      <Route path="/dashboard/job/:jobId" element={<JobPage2 />} />
      <Route path="/dashboard/client/job/:jobId" element={<JobPage />} />
      <Route path="/freelancer/:id" element={<FreelancerProfilePage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/password/:token" element={<Password />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<Withdraw />} />
      <Route path="/verify/email" element={<VerifyEmail />} />
      <Route path="/verify/phone" element={<VerifyPhone />} />
      <Route path="/trial" element={<Trial />} />
      <Route path="*" element={<Error404 />} />
      <Route path="/404" element={<Error404 />} />
    </Routes>
  );
}

export default Routers;
