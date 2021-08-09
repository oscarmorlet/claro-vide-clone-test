import { createSlice } from "@reduxjs/toolkit";

export const videosSlice = createSlice({
  name: "videos",
  initialState: {
    list: [],
    videoDetail: {},
  },
  reducers: {
    setVideoList: (state, action) => {
      state.list = action.payload;
    },
    setVideoDetail: (state, action) => {
      state.videoDetail = action.payload;
    },
  },
});

export const { setVideoList, setVideoDetail } = videosSlice.actions;

export default videosSlice.reducer;

