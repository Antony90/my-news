import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "..";
import { Article } from "../../models/Article";
import { app, getDatabase } from "../../services/realm";
import { Status } from "../constants";
import { loremIpsum } from "lorem-ipsum";

interface ArticlesState {
  all: Article[];
  status: number;
}
const initialState: ArticlesState = {
  all: [],
  status: Status.Loading,
};

export const fetchArticles = createAsyncThunk("articles/fetch", async () => {
  const db = await getDatabase(app);
  const lastFetchStr = localStorage.getItem("last_fetch");
  const now = new Date().getTime();

  // Time in ms since last articles fetch
  let timeDiff = 0; // unset
  if (lastFetchStr) {
    const lastFetchDate = Number(lastFetchStr);
    timeDiff = now - lastFetchDate;
  }
  // If 1 hour out of date or key not set
  let articles: Article[];
  if (timeDiff > 1000 * 3600 || timeDiff === 0) {
    articles = await db
      .collection("articles")
      .aggregate([
        { $sort: { published_date: -1 } },
        { $limit: 1000 },
        { $addFields: { id: "$_id" } },
        { $unset: "_id" },
        {
          $set: {
            published_date: {
              // Date objects aren't serializable and redux toolkit recommends
              // state with only serializable objects
              $convert: { input: "$published_date", to: "string" },
            },
          },
        },
      ]);
      if (!process.env.DEMO) {
          const rndDate = () =>
            new Date(
              new Date().getTime() - 1000 * 60 * Math.floor(Math.random() * 24)
            );
            articles = articles.map((article) => ({
            ...article,
            votes_up: Math.floor(Math.random() * 25),
            votes_down: Math.floor(Math.random() * 10),
            comments: Array(Math.floor(Math.random() * 10)).fill(0).map((_, i) => ({
              content: loremIpsum({ sentenceLowerBound: 3, sentenceUpperBound: 15 }),
              date: rndDate(),
            })).sort((a, b) => (b.date.getTime() - a.date.getTime())),
          }));
    }
    // FIXME: convert ObjectId to String
    localStorage.setItem("articles", JSON.stringify(articles));
    localStorage.setItem("last_fetch", String(now));
  } else {
    const articlesJSON = localStorage.getItem("articles") || "[]";
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
        console.log(action.error.message);
      });
  },
});

export const selectArticles = (state: RootState) => state.articles.all;
export const selectStatus = (state: RootState) => state.articles.status;

export default articlesSlice.reducer;
