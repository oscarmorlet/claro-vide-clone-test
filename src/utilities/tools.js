import axios from "axios";
import { setVideoDetail, setVideoList } from "../store/slices/videos";
import {
    URL_API_LEVEL,
    URL_API_VERSION,
    URL_API,
    URL_MOVIE_DETAIL,
  } from "../utilities/api";

export const callAxios = (url) => {
    const resultPromise = new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          return reject(error);
        });
    });
    return resultPromise;
  };

  export const fetchAllVideos = (genre = 'gen_accion') => (dispatch) => {
    getListByGenres(genre)
      .then((response) => {
        return callAxios(response);
      })
      .then(({ data }) => {
        const listMovies = data.response.groups;
        dispatch(setVideoList(listMovies));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const getListByGenres = (genre) => {
    const resultPromise = new Promise((resolve, reject) => {
      callAxios(URL_API_LEVEL + "&node=" + genre)
        .then(({ data }) => {
          /* Module */
          let module = data?.response?.modules?.module;
          let [moduleInfinitList] = module.filter(
            (element) => element.type === "listadoinfinito"
          );
          /* Component */
          let component = moduleInfinitList?.components?.component;
          let [componentInfinitList] = component.filter(
            (element) => element.type === "Listadoinfinito"
          );
          /* Url */
          let url = componentInfinitList?.properties?.url;
          const url_listado = `${URL_API}/${url}?${URL_API_VERSION}`;
          return resolve(url_listado);
        })
        .catch((error) => {
          return reject(error);
        });
    });
    return resultPromise;
  };

  export const fetchVideoDetail = (id= '') => (dispatch) => {
    callAxios( URL_MOVIE_DETAIL + "&group_id=" + id )
      .then(({ data }) => {
        let detail = data?.response?.group?.common;
        return dispatch(setVideoDetail(detail));
      })
      .catch((error) => {
        return error;
      });
  };

  

export const cloneArray = (list) => {
    return list.map((element) => {
      const newElement = Object.assign({}, element);
      return newElement;
    });
  };