import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./reducers/articles";
import filterReducer from "./reducers/filter";
// ...
const store = configureStore({
  reducer: {
    articles: articlesReducer,
    filter: filterReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;