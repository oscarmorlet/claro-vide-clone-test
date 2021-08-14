import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";
import { useScroll } from "../utilities/hooks/useScroll";
import { genres } from "../utilities/tools";
import SearchVideos from "./SearchVideos";

function Navbar(props) {
  const { scrollY } = useScroll();

  return (
    <div className={`navbar ${scrollY > 60 && "highlight"}`}>
      <div className="navbar-left">
        <h1>Claro Video Clone</h1>
        <div className="nav-links">
          {genres.map((genre, index) => {
            return (
              <NavLink
                activeClassName="active"
                className="nav-link"
                exact
                to={`/videos/${genre.url}`}
                key={index}
              >
                {genre.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="navbar-right">
        <SearchVideos />
      </div>
    </div>
  );
}

export default Navbar;
