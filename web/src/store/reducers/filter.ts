import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../models/Article";
import { matchSorter } from "match-sorter";
import { RootState } from "..";

interface FilterState {
  categories: string[];
  providers: string[];
  search: string;
}
const initialState: FilterState = {
  categories: [],
  providers: [],
  search: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
        .filter((category) => !isNaN(Number(category))) // Category is string number
      state.providers= action.payload
        .filter((prov) => ["BBC", "Sky News", "Daily Mail"].includes(prov))
        // Providers otherwise
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const filterArticles = (
  articles: Article[],
  { categories, providers, search }: FilterState
) => {
  let filtered = articles;
  if (search !== '') {
    filtered = matchSorter(articles, search, {
      keys: [(article) => article.title],
    })
  }
  if (categories.length > 0 || providers.length > 0) {
    filtered = filtered.filter(
      ({ provider, category_id }) =>
      providers.includes(provider) ||
      categories.includes(String(category_id))
    );
  }
  return filtered;
};
export const selectFilter = (state: RootState) => state.filter;

export const { setTags, setSearch } = filterSlice.actions;
export default filterSlice.reducer;
