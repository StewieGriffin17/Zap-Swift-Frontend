import React, { useState } from "react";
import Logo from "./Logo";
import { NavLink } from "react-router";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `text-sm md:text-base lg:text-[16px] font-medium transition-colors duration-200 ${
      isActive
        ? "text-[#03373D] font-bold"
        : "text-gray-700 hover:text-[#03373D]"
    }`;

  const navItems = (
    <>
      <li>
        <NavLink to="/services" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-us" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/pricing" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
          Pricing
        </NavLink>
      </li>
      <li className="lg:hidden">
        <NavLink to="/be-rider" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
          Be a Rider
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white rounded-xl lg:rounded-2xl mt-4 sm:mt-8 mb-4 sm:mb-12 px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <div className="w-24 sm:w-28 md:w-32 lg:w-36">
              <Logo />
            </div>
          </NavLink>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navItems}
          </ul>
        </div>

        {/* Right: Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden sm:flex btn border border-gray-300 bg-white text-gray-800 text-sm md:text-base lg:text-[16px] font-semibold px-3 md:px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 min-h-0 h-auto">
            Sign In
          </button>
          <button className="hidden lg:flex btn bg-[#CFEA68] text-black text-sm md:text-base lg:text-[16px] font-semibold px-3 md:px-4 lg:px-6 py-2 lg:py-3 hover:bg-lime-400 transition-all duration-200 rounded-lg lg:rounded-xl shadow-md hover:shadow-lg min-h-0 h-auto">
            Be a Rider
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden btn btn-ghost p-2 min-h-0 h-auto"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-7 sm:w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
          <ul className="flex flex-col gap-3">
            {navItems}
          </ul>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
            <button className="btn border border-gray-300 bg-white text-gray-800 text-sm font-semibold w-full py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 min-h-0 h-auto">
              Sign In
            </button>
            <button className="btn bg-[#CAEB66] text-black text-sm font-semibold w-full py-2 hover:bg-lime-400 transition-all duration-200 rounded-lg shadow-md min-h-0 h-auto">
              Be a Rider
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;