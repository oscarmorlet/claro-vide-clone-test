import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWindowDimensions from "../utilities/hooks/useWindowDimensions";
import { fetchVideoDetail } from "../utilities/tools";

function VideoDetail(props) {
  const { idGroup } = useParams();
  const { width } = useWindowDimensions();
  const { videoDetail } = useSelector((state) => state.videos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideoDetail(idGroup));
  }, [dispatch, idGroup]);

  const goBack = () => {
    props.history.goBack();
  };
  const image = width > 768 ? videoDetail.image_large : videoDetail.image_small;

  let genres = videoDetail.extendedcommon?.genres?.genre || [];
  genres = genres.map((element) => element.desc).join();

  let directors = videoDetail.extendedcommon?.roles?.role || [];
  directors =
    directors.filter((element) => element.desc === "Director")[0]?.talents
      ?.talent || [];
  directors = directors.map((element) => element.fullname).join() || "";

  let actors = videoDetail.extendedcommon?.roles?.role || [];
  actors =
    actors.filter((element) => element.desc === "Actor")[0]?.talents?.talent ||
    [];
  actors = actors.map((element) => element.fullname).join() || "";

  /* console.log(actors); */

  return (
    <div className="container-video-detail">
      <div className="video-detail">
        <div className="button-detail">
          <button onClick={goBack}>Regresar</button>
        </div>
        <div className="title-detail">
          <h1 className="title">{videoDetail.title}</h1>
        </div>
        <div className="data-detail">
          <div className="image-detail">
            <img src={image} alt={videoDetail.title} />
          </div>
          <div className="data-others">
            <h2>{videoDetail.title}</h2>
            <h4>
              ({videoDetail.extendedcommon?.media?.publishyear}){" "}
              {videoDetail.extendedcommon?.media?.duration}
            </h4>
            <h4>Género: {genres}</h4>
            <h4>Actores: {actors}</h4>
            <h4>Director: {directors}</h4>
            <h4>
              Titulo original:{" "}
              {videoDetail?.extendedcommon?.media?.originaltitle}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;
