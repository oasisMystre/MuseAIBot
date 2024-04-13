import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import type { LoadingState } from "../types";
import type { Library } from "../../lib/api/models";

export const getUserLibraries = createAsyncThunk(
  "libraries/getUserLibraries",
  () => []
);
const libraryAdapter = createEntityAdapter<Library>();

export const librarySlice = createSlice({
  name: "libraries",
  initialState: libraryAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserLibraries.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getUserLibraries.rejected, (state) => {
        state.loadingState = "failed";
      })
      .addCase(getUserLibraries.fulfilled, (state, { payload }) => {
        state.loadingState = "success";
        libraryAdapter.setAll(state, payload);
      });
  },
});

export const libraryReducer = librarySlice.reducer;
export const librarySelectors = libraryAdapter.getSelectors();
