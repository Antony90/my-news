import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { Article } from '../../app/models/Article';

const initialState: Article[] = []

export const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Article[]>  ) => {
            return action.payload
        } 
    }
})

export const { set } = articlesSlice.actions;

export const selectArticles = (state: RootState) => state.articles;

export default articlesSlice.reducer;