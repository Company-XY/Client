import hero from "../../assets/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="Hero" className="bg-white dark:bg-gray-900">
      <div class="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div class="mr-auto place-self-center lg:col-span-7">
          <h1 class="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
            Re-inventing freelancing <br />
          </h1>
          <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Join us today, and experience a seamless and rewarding journey where
            freelancers and clients come together to achieve excellence.
          </p>
          <div class="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              class="inline-flex items-center hover:font-semibold justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              class="inline-flex items-center hover:font-semibold justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Login
            </Link>
          </div>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={hero} alt="hero image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
