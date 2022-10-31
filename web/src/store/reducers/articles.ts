import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { App } from "realm";

import type { RootState } from "..";
import { Article } from "../../models/Article";
import { app, getDatabase } from "../../services/realm";
import { Status } from "../constants";

interface ArticlesState {
  all: Article[];
  status: number;
}
const initialState: ArticlesState = {
  all: [],
  status: Status.Loading,
};

export const fetchArticles = createAsyncThunk("articles/fetch", async () => {
  const db = getDatabase(app);
  const lastFetchStr = localStorage.getItem("last_fetch");
  const now = new Date().getTime();

  // Time in ms since last articles fetch
  let diff = -1; // unset
  if (lastFetchStr) {
    const lastFetchDate = Number(lastFetchStr);
    diff = now - lastFetchDate;
  }

  // If 1 hour out of date or key not set
  let articles: Article[];
  if (diff > 1000 * 3600 || diff === -1) {
    articles = await db
      .collection("articles")
      .aggregate([{ $sort: { published_date: -1 } }]);
    // FIXME: convert ObjectId to String    
    localStorage.setItem("articles", JSON.stringify(articles));
    localStorage.setItem("last_fetch", String(now));
  } else {
    const articlesJSON = localStorage.getItem("articles") || "";
    articles = JSON.parse(articlesJSON);
  }
  return articles;
});

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = Status.Complete;
        state.all = action.payload;
      })

      .addCase(fetchArticles.pending, (state, action) => {
        state.status = Status.Loading;
      })

      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = Status.Failure;
      });
  },
});

export const selectArticles = (state: RootState) => state.articles.all;

export default articlesSlice.reducer;
