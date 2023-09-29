import React, { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-xl font-bold">
          Your Logo
        </a>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu (Hidden by default) */}
        <div className={`lg:hidden ${menuOpen ? "block" : "hidden"}`}>
          <a href="/" className="block text-white py-2">
            Home
          </a>
          <a href="/about" className="block text-white py-2">
            About
          </a>
          <a href="/services" className="block text-white py-2">
            Services
          </a>
          <a href="/contact" className="block text-white py-2">
            Contact
          </a>
        </div>

        {/* Desktop Menu Items (Hidden on small screens) */}
        <div className={`lg:flex ${menuOpen ? "hidden" : "block"}`}>
          <a href="/" className="text-white">
            Home
          </a>
          <a href="/about" className="text-white lg:ml-4">
            About
          </a>
          <a href="/services" className="text-white lg:ml-4">
            Services
          </a>
          <a href="/contact" className="text-white lg:ml-4">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
