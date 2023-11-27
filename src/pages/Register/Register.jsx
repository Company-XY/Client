import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Register = () => {
  return (
    <main className="bg-cover bg-center h-screen w-full sm:px-5 md:px-10 mt-5 grid place-items-center text-gray-900">
      <div className="md:px-24 px-2 mt-10 pt-5">
        <h2 className="font-semibold text-3xl text-center">
          Welcome to Assist Africa
        </h2>
        <p className="leading-8 px-1 md:px-10 text-center">
          Join us today, and experience a seamless and rewarding journey where
          freelancers and clients come together to achieve excellence. In our
          vibrant and dynamic community, opportunities are boundless.
          <span className="hidden md:flex">
            Whether you're a talented freelancer looking to showcase your skills
            and grow your career, or a client seeking top-tier expertise to
            bring your projects to life, our platform is your gateway to
            success. Our user-friendly interface and intuitive features make the
            hiring process a breeze. Easily connect with skilled professionals,
            review their portfolios, and collaborate on projects that matter to
            you. Our secure and transparent payment system ensures that
            freelancers are compensated fairly for their hard work, fostering
            trust and long-term partnerships. As a client, you'll have access to
            a pool of diverse talents, each eager to bring your vision to
            reality. And as a freelancer, you'll find a steady stream of
            exciting projects that align with your passion. Join our
            ever-growing community today and experience the perfect synergy
            between freelancers and clients, where excellence is the norm, and
            success is the destination. The journey begins here
          </span>
        </p>
        <section className="flex flex-col gap-6 justify-center md:flex-row md:justify-evenly m-4">
          <Link to="/register/client">
            <div className="border-2 rounded-lg border-blue-700 hover:border-blue-400 transition duration-300">
              <div className="bg-snow-100 hover:bg-blue-400 p-6">
                <h2 className="font-semibold text-lg mb-2 text-center">
                  Looking to hire or consult experts ?
                </h2>
                <p className="text-gray-600">
                  Find top-tier expertise and kickstart your projects.
                </p>
              </div>
              <div className="hidden md:flex hover:bg-blue-600 justify-center space-x-2 mt-2 items-center py-2">
                <span className="text-gray-800 font-semibold">Get Started</span>
                <FaArrowRight className="transform group-hover:-rotate-90 text-gray-800 transition-all duration-300" />
              </div>
            </div>
          </Link>
          <span className="md:hidden grid place-items-center font-semibold text-blue-700">
            OR
          </span>
          <Link to="/register/freelancer">
            <div className="border-2 rounded-lg border-blue-700 hover:border-blue-400 transition duration-300">
              <div className="bg-snow-100 hover:bg-blue-400 p-6">
                <h2 className="font-semibold text-lg mb-2 text-center">
                  Looking for work as a Virtual Assistant ?
                </h2>
                <p className="text-gray-600">
                  Showcase your skills and find exciting projects.
                </p>
              </div>
              <div className="hidden md:flex hover:bg-blue-600 justify-center space-x-2 mt-2 items-center py-2">
                <span className="text-gray-800 font-semibold">Get Started</span>
                <FaArrowRight className="transform group-hover:-rotate-90 text-gray-800 transition-all duration-300" />
              </div>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Register;
