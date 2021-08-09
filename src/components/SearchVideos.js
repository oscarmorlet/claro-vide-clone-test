import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVideoList } from "../store/slices/videos";
import { cloneArray } from "../utilities/tools";

function SearchVideos(props) {
  const { list } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");
  const [listVideos, setListVideos] = useState([]);

  const handleInputSearch = ({ target }) => {
    setInputSearch(target.value);
  };

  useEffect(() => {
    filterVideos(inputSearch);
  }, [inputSearch]);

  useEffect(() => {
    const newList = cloneArray(list);
    setListVideos(newList);
  }, [list]);

  const filterVideos = (value) => {
    let updatedList = [];
    if (value.length) {
      const formattedValue = value.toLowerCase();
      updatedList = listVideos.map((element) => {
        const formattedTitle = element.title.toLowerCase();
        formattedTitle.includes(formattedValue)
          ? (element.isHidden = false)
          : (element.isHidden = true);
        return element;
      });
    } else {
      updatedList = resetList();
    }
    dispatch(setVideoList(updatedList));
  };

  const resetList = () => {
    const newList = cloneArray(list);
    const restoredList = newList.map((item) => {
      item.isHidden = false;
      return item;
    });
    return restoredList;
  };

  return (
    <>
      <input
        name="search"
        className="input-search"
        placeholder="Buscar..."
        onChange={handleInputSearch}
        value={inputSearch}
      />
    </>
  );
}

export default SearchVideos;
