import React, { useState } from "react";
import { Link } from "react-router-dom";
import Head from "./Head";
import "./header.css";

import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedin } from "../../../../features/auth/auth";

const Header = () => {
  const [click, setClick] = useState(false);

  const loginState = useSelector((state) => state.authSetter.value);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("login-token");
    localStorage.removeItem("login-user");
    dispatch(setIsLoggedin(false));
  };

  const showGamesWindow = () => {
    const gameUrl = "http://localhost:3000/games";
    window.open(gameUrl, "_blank", "width=1600,height=1000");
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
            {localStorage.getItem("login-token") && (
              <li onClick={showGamesWindow}>
                <Link to="#">Game</Link>
              </li>
            )}
          </ul>
          <div className="start">
            <div className="button">
              {localStorage.getItem("login-token") ? (
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
