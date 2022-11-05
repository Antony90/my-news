import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../../models/Article";
import { RootState } from "..";
import { search as filterSearch } from "fast-fuzzy";

interface FilterParams {
  categories: string[];
  providers: string[];
  search: string;
  sentimentBounds: [number, number];
}

interface FilterState {
  params: FilterParams;
  loading: boolean;
}
const initialState: FilterState = {
  params: {
    categories: [],
    providers: [],
    search: "",
    sentimentBounds: [-1, 1]
  },
  loading: false
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<string[]>) => {
      state.params.categories = action.payload
        .filter((category) => !isNaN(Number(category))) // Category is string number
      state.params.providers= action.payload
        .filter((prov) => ["BBC", "Sky News", "Daily Mail"].includes(prov))
        // Providers otherwise
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.params.search = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSentimentBounds: (state, action: PayloadAction<[number, number]>) => {
      state.params.sentimentBounds = action.payload;
    }
  },
});

export const filterArticles = (
  articles: Article[],
  { categories, providers, search, sentimentBounds: [lowerSent, upperSent] }: FilterParams
) => {
  let filtered = articles;
  if (search !== '') {
    filtered = filterSearch(search, articles, {
      keySelector: (article) => article.title
    })
  }
  if (lowerSent > -1 || upperSent < 1) {
    filtered = filtered.filter(({ sentiment }) =>
      lowerSent <= sentiment && sentiment <= upperSent
  )}
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

export const { setTags, setSearch, setLoading, setSentimentBounds } = filterSlice.actions;
export default filterSlice.reducer;
