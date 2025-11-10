import type { AnimeDetail } from "../types/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchResultsById } from "../thunks/animeByIdThunk";

interface AnimeState {
  data: AnimeDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnimeState = {
  data: null,
  loading: false,
  error: null,
};

const animeByIdSlice = createSlice({
  name: "animeById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResultsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchResultsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default animeByIdSlice.reducer;
