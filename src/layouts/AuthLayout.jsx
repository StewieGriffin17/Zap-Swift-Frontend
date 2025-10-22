import React from "react";
import { Outlet } from "react-router";
import auth_img from "../assets/authImage.png";
import Logo from "../pages/shared/Logo";

const AuthLayout = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        {/* Logo */}
        <div className="p-4 sm:p-6">
          <Logo />
        </div>

        {/* Image */}
        <div className="flex items-center justify-center bg-[#F6FAEF] p-6 sm:p-8">
          <img
            src={auth_img}
            alt="Courier delivering a parcel"
            className="w-full max-w-[400px] sm:max-w-[500px] h-auto object-contain"
          />
        </div>

        {/* Form */}
        <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
        {/* Left: logo + form */}
        <div className="relative">
          {/* Logo */}
          <div className="absolute top-[44px] left-[55px] z-10">
            <Logo />
          </div>

          {/* Form container */}
          <div className="flex min-h-screen items-center justify-center px-12">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Right: illustration panel */}
        <div className="flex items-center justify-center bg-[#F6FAEF] p-12">
          <img
            src={auth_img}
            alt="Courier delivering a parcel"
            className="w-full max-w-[720px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;