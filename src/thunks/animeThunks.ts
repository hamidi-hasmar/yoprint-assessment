import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import type { AnimeFullList } from "../types/types";

interface FetchParams {
  q?: string;
  page?: number;
}

export const fetchResults = createAsyncThunk<AnimeFullList, FetchParams>(
  "anime/fetchSearch",
  async ({ q = "", page = 1 }, { rejectWithValue, signal }) => {
    try {
      const response = await api.get<AnimeFullList>("/anime", {
        params: { q, page },
        signal,
      });

      if (!response.data || !response.data.data) {
        return rejectWithValue("Invalid response from server");
      }

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 429) {
        return rejectWithValue("Rate limit exceeded. Try again later.");
      }
      return rejectWithValue(error.message || "Network error");
    }
  }
);
