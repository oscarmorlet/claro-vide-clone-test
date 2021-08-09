import { configureStore } from "@reduxjs/toolkit";

import videos from "./slices/videos";

export default configureStore({
  reducer: {
    videos,
  },
});
