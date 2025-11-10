import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import type { AnimeFullList } from "../types/types";

interface FetchParams {
  q?: string;
  page?: number;
}

export const fetchResults = createAsyncThunk<AnimeFullList, FetchParams>(
  "anime/fetchSearch",
  async ({ q = "", page = 1 }, { signal }) => {
    const response = await api.get<AnimeFullList>("/anime", {
      params: { q, page },
      signal,
    });
    return response.data;
  }
);
