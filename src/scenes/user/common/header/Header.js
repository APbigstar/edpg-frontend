import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";

import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedin } from "../../../../features/auth/auth";

// import { useSelector } from "react-redux";

const Header = () => {
  const [click, setClick] = useState(false);

  const loginState = useSelector((state) => state.authSetter.value);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("login-token");
    dispatch(setIsLoggedin(false));
  };

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB "}
            onClick={() => setClick(false)}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/journal">Journal</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="start">
            <div className="button">
              {loginState ? (
                <Link onClick={logout}>Sign Out</Link>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
            </div>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? (
              <i className="fa fa-times"> </i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;
