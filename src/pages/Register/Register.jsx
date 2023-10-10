import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Register = () => {
  return (
    <main className="bg-cover bg-center min-h-screen w-full px-5 md:px-10 py-5 grid place-items-center text-gray-900">
      <div className="px-24">
        <h2 className="font-semibold text-xl md:text-3xl text-center">
          Welcome to Assist Africa
        </h2>
        <p className="leading-8 px-10 text-center m-10">
          Join us today, and experience a seamless and rewarding journey where
          freelancers and clients come together to achieve excellence. In our
          vibrant and dynamic community, opportunities are boundless. Whether
          you're a talented freelancer looking to showcase your skills and grow
          your career, or a client seeking top-tier expertise to bring your
          projects to life, our platform is your gateway to success. Our
          user-friendly interface and intuitive features make the hiring process
          a breeze. Easily connect with skilled professionals, review their
          portfolios, and collaborate on projects that matter to you. Our secure
          and transparent payment system ensures that freelancers are
          compensated fairly for their hard work, fostering trust and long-term
          partnerships. As a client, you'll have access to a pool of diverse
          talents, each eager to bring your vision to reality. And as a
          freelancer, you'll find a steady stream of exciting projects that
          align with your passion. Join our ever-growing community today and
          experience the perfect synergy between freelancers and clients, where
          excellence is the norm, and success is the destination. The journey
          begins here
        </p>
        <section className="flex flex-col gap-6 justify-center md:flex-row md:justify-evenly">
          <Link to="/register/client">
            <div className="border rounded-lg">
              <div className="bg-snow-100 hover:bg-blue-400 p-6">
                <h2 className="font-semibold text-lg mb-2">
                  Looking to hire or consult experts
                </h2>
                <p className="text-gray-600">{/* Your description */}</p>
              </div>
              <div className="bg-snow-200 hover:bg-blue-600 p-4 flex justify-between items-center">
                <span>Get Started</span>
                <FaArrowRight className="transform group-hover:-rotate-90 transition-all duration-300" />
              </div>
            </div>
          </Link>
          <Link to="/register/freelancer">
            <div className="border rounded-lg">
              <div className="bg-snow-100 hover:bg-blue-400 p-6">
                <h2 className="font-semibold text-lg mb-2">
                  Looking for work as a Virtual Assistant
                </h2>
                <p className="text-gray-600">{/* Your description */}</p>
              </div>
              <div className="bg-snow-200 hover:bg-blue-600 p-4 flex justify-between items-center">
                <span>Get Started</span>
                <FaArrowRight className="transform group-hover:-rotate-90 transition-all duration-300" />
              </div>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Register;
