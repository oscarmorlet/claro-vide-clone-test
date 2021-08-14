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

export const fetchAllVideos =
  (genre = "gen_accion") =>
  (dispatch) => {
    getListByGenres(genre)
      .then((response) => {
        return callAxios(response);
      })
      .then(({ data }) => {
        const listMovies = data?.response?.groups ?? [];
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
        const module = data?.response?.modules?.module;
        const [moduleInfinitList] = module.filter(
          (element) => element.type === "listadoinfinito"
        );
        /* Component */
        const component = moduleInfinitList?.components?.component;
        const [componentInfinitList] = component.filter(
          (element) => element.type === "Listadoinfinito"
        );
        /* Url */
        const url = componentInfinitList?.properties?.url;
        const url_listado = `${URL_API}/${url}?${URL_API_VERSION}`;
        return resolve(url_listado);
      })
      .catch((error) => {
        return reject(error);
      });
  });
  return resultPromise;
};

export const fetchVideoDetail =
  (id = "") =>
  (dispatch) => {
    if (!id) return dispatch(setVideoDetail({}));
    callAxios(URL_MOVIE_DETAIL + "&group_id=" + id)
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

export const filterVideos = (listVideos, value) => {
  if (value.length) {
    return listVideos.map((element) => {
      element.title.toLowerCase().includes(value.toLowerCase())
        ? (element.isHidden = false)
        : (element.isHidden = true);
      return element;
    });
  } else {
    return resetList(listVideos);
  }
};

const resetList = (listVideos) => {
  const newList = cloneArray(listVideos);
  return newList.map((item) => {
    item.isHidden = false;
    return item;
  });
};

export const genres = [
  { name: "Acción y Aventuras", url: "gen_accion" },
  { name: "Anime y Videojuegos", url: "gen_anime" },
  { name: "Biográficas", url: "gen_biograficas" },
  { name: "Ciencia Ficción", url: "gen_scifi" },
  { name: "Comedia", url: "gen_comedia" },
];