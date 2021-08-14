import useWindowDimensions from "../utilities/hooks/useWindowDimensions";
import { Link } from "react-router-dom";
import { useState } from "react";

const VideoCover = ({ element }) => {
  const [loaded, setLoaded ] = useState(false);
  const { width } = useWindowDimensions();
  const image = width > 768 ? element.image_small : element.image_medium;

  return (
    <Link to={`/video_detail/${element.id}`}>
      <div className="element-detail">
        { !loaded && <div className="element-detail-image-box"> </div>}
        <img src={image} alt={element.title} onLoad={() => setLoaded(true)}/>
        <span className="overlay">{element.title}</span>
      </div>
    </Link>
  );
};

export default VideoCover;
