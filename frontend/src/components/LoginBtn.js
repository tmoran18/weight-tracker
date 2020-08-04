import React from "react";

const LoginBtn = ({ user, logout, login }) => {
  return (
    <div>
      {user ? (
        <button className="login_btn" onClick={logout}>
          Logout
        </button>
      ) : (
        <button className="login_btn" onClick={login}>
          Log in with Google
        </button>
      )}
    </div>
  );
};

export default LoginBtn;
