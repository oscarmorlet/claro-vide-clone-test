import useWindowDimensions from "../utilities/hooks/useWindowDimensions";
import { Link } from "react-router-dom";

const VideoCover = ({ element }) => {
  const { width } = useWindowDimensions();
  const image = width > 768 ? element.image_small : element.image_medium;

  return (
    <Link to={`/video_detail/${element.id}`}>
      <div className="element-detail">
        <img src={image} alt={element.title} />
        <span className="overlay">{element.title}</span>
      </div>
    </Link>
  );
};

export default VideoCover;
