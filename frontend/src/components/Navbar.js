import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Logo />
      <div className="logo">Weight Tracker</div>
    </nav>
  );
};

export default Navbar;
