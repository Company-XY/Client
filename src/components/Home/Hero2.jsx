import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";

const Hero = () => {
  return (
    <section id="Hero" className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
            Re-inventing freelancing <br />
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Join us today, and experience a seamless and rewarding journey where
            freelancers and clients come together to achieve excellence.
          </p>
          <div className="px-5">
            <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
              <Link
                to="/register/freelancer"
                className="flex-1 rounded-lg border bg-white py-3 px-6 font-semibold hover:bg-blue-600 hover:text-white inline-flex items-center justify-center transition duration-300 ease-in-out"
              >
                Looking for work
              </Link>
              <p className="text-center grid place-items-center text-gray-500">
                OR
              </p>
              <Link
                to="/register/client"
                className="flex-1 rounded-lg border bg-white py-3 px-6 font-semibold hover:bg-blue-600 hover:text-white inline-flex items-center justify-center transition duration-300 ease-in-out"
              >
                Looking to hire
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
