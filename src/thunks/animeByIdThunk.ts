import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import type { AnimeDetail } from "../types/types";

interface FetchParams {
  id?: number;
}

export const fetchResultsById = createAsyncThunk<AnimeDetail, FetchParams>(
  "anime/fetchById",
  async ({ id }, { signal }) => {
    const response = await api.get(`/anime/${id}/full`, {
      signal,
    });
    return response.data.data;
  }
);
