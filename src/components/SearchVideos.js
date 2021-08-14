import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVideoList } from "../store/slices/videos";
import { cloneArray, filterVideos } from "../utilities/tools";

function SearchVideos(props) {
  const { list } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [listVideos, setListVideos] = useState([]);

  const handleInputSearch = ({ target }) => {
    const updatedList = filterVideos(listVideos,target.value);
    dispatch(setVideoList(updatedList));
  };

  useEffect(() => {
    const newList = cloneArray(list);
    setListVideos(newList);
  }, [list]);

  return (
    <>
      <input
        name="search"
        className="input-search"
        placeholder="Buscar..."
        onChange={handleInputSearch}
      />
    </>
  );
}

export default SearchVideos;
