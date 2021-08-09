import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";
import { useScroll } from "../utilities/hooks/useScroll";
import SearchVideos from "./SearchVideos";

function Navbar(props) {
  const { scrollY } = useScroll();

  const genres = [
    { name: "Acción y Aventuras", url: "gen_accion" },
    { name: "Anime y Videojuegos", url: "gen_anime" },
    { name: "Biográficas", url: "gen_biograficas" },
    { name: "Ciencia Ficción", url: "gen_scifi" },
    { name: "Comedia", url: "gen_comedia" },
  ];

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
