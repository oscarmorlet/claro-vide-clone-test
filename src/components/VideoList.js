import React, { useEffect } from "react";
import VideoCover from "./VideoCover";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVideos } from "../utilities/tools";

const VideoList = ({ genre }) => {
  const { list } = useSelector((state) => state.videos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllVideos(genre));
  }, [dispatch, genre]);

  return (
    <div className="element-list">
      {list.length &&
        list.map(
          (element) =>
            !element.isHidden && (
              <VideoCover key={element.id} element={element} />
            )
        )}
    </div>
  );
};

export default VideoList;
