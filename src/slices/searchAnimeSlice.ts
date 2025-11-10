import type { AnimeFullList } from "../types/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchResults } from "../thunks/animeThunks";

interface AnimeState {
  data: AnimeFullList["data"] | null;
  pagination: AnimeFullList["pagination"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnimeState = {
  data: null,
  pagination: null,
  loading: false,
  error: null,
};

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default animeSlice.reducer;
