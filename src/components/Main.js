import React from "react";
import { useParams } from "react-router-dom";
import VideoList from "./VideoList";

function Main(props) {
  const { genre } = useParams();

  return (
    <div>
      <VideoList genre={genre} />
    </div>
  );
}

export default Main;
