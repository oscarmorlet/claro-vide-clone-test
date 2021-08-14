import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWindowDimensions from "../utilities/hooks/useWindowDimensions";
import { fetchVideoDetail } from "../utilities/tools";

function VideoDetail(props) {
  const { idGroup } = useParams();
  const { width } = useWindowDimensions();
  const { videoDetail } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [loaded, setLoaded ] = useState(false)

  useEffect(() => {
    dispatch(fetchVideoDetail(idGroup));
    return dispatch(fetchVideoDetail(""));
  }, [dispatch, idGroup]);

  const goBack = () => {
    props.history.goBack();
  };
  const image = width > 768 ? videoDetail.image_large : videoDetail.image_small;

  let genres =
    videoDetail.extendedcommon?.genres?.genre
      ?.map((element) => element.desc)
      ?.join() ?? '';

  let directors =
    videoDetail.extendedcommon?.roles?.role
      .filter((element) => element.desc === "Director")[0]
      ?.talents?.talent?.map((element) => element.fullname)
      ?.join() ?? '';

  let actors =
    videoDetail.extendedcommon?.roles?.role
      ?.filter((element) => element.desc === "Actor")[0]
      ?.talents?.talent.map((element) => element.fullname)
      ?.join() ?? '';

  return (
    <div className="container-video-detail">
      <div className="video-detail">
        <div className="button-detail">
          <button onClick={goBack}>Regresar</button>
        </div>
        <div className="title-detail">
          <h1>{videoDetail?.title ?? ''}</h1>
        </div>
        <div className="data-detail">
          <div className="image-detail">
            { !loaded && <div className="element-detail-image-box"> </div>}
            <img src={image} alt={videoDetail?.title ?? ''} onLoad={() => setLoaded(true)}/>
          </div>
          { loaded ? 
          <div className="data-others">
            <h2>{videoDetail?.title ?? ''}</h2>
            <h4>
            ({videoDetail?.extendedcommon?.media?.publishyear ?? ''}){" "}
            {videoDetail?.extendedcommon?.media?.duration ?? ''}
            </h4>
            <h4>Género: {genres}</h4>
            <h4>Actores: {actors}</h4>
            <h4>Director: {directors}</h4>
            <h4>
            Titulo original:{" "}
            {videoDetail?.extendedcommon?.media?.originaltitle ?? ''}
            </h4>
          </div>
          : <div className="element-detail-image-box"> </div>}
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;
