import React from "react";
import Logo from "./Logo";
import LoginBtn from "./LoginBtn";

const Navbar = ({ user, login, logout }) => {
  return (
    <nav className="navbar">
      <Logo />
      <div className="logo">Weight Tracker</div>
      <LoginBtn user={user} login={login} logout={logout} />
    </nav>
  );
};

export default Navbar;
