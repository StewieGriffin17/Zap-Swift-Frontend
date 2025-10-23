import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
  
      <div className="flex items-end">
        <img src={logo} alt="logo" className="mb-1" />
        <p className="text-3xl -ml-3 font-extrabold">ProFast</p>
      </div>

  );
};

export default Logo;
