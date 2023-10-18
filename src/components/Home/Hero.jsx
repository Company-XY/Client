import hero from "../../assets/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="Hero" className="bg-white dark:bg-gray-900">
      <div className="grid h-screen max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
            Re-inventing freelancing <br />
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Join us today, and experience a seamless and rewarding journey where
            freelancers and clients come together to achieve excellence.
          </p>
          <div className="">
            <div className="flex space-x-5 mb-2">
              <Link
                to="/register/freelancer"
                className="border-2 rounded-lg bg-blue-100 py-2 px-4 font-semibold hover:bg-blue-600 hover:text-white inline-flex items-center"
              >
                Looking for work ?
              </Link>
              <p className="grid place-items-center font-bold">OR</p>
              <Link
                to="/register/client"
                className="border-2 rounded-lg bg-blue-100 py-2 px-4 font-semibold hover:bg-blue-600 hover:text-white inline-flex items-center"
                //className="inline-flex items-center hover:font-semibold justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Looking to hire ?
              </Link>
            </div>
            <hr className="my-2" />
            <div className="pt-3 w-full ml-4">
              <Link
                to="/login"
                className="font-semibold border-2 rounded-lg py-2 px-4 mt-2 hover:text-blue-600"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={hero} alt="hero image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
