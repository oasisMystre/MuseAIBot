import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

import { Api } from "../../lib/api";
import type { Library, LibraryAndAudioInfo } from "../../lib/api/models";

import type { LoadingState } from "../types";

export const getUserLibraries = createAsyncThunk(
  "libraries/getUserLibraries",
  (api: Api) => api.library.getLibraries()
);
const libraryAdapter = createEntityAdapter({
  selectId: (model: LibraryAndAudioInfo) => model.library.id,
});

export const librarySlice = createSlice({
  name: "libraries",
  initialState: libraryAdapter.getInitialState<LoadingState>({
    loadingState: "idle",
  }),
  reducers: {
    addMany: libraryAdapter.addMany,
  },
  extraReducers(builder) {
    builder
      .addCase(getUserLibraries.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(getUserLibraries.rejected, (state) => {
        state.loadingState = "failed";
      })
      .addCase(getUserLibraries.fulfilled, (state, { payload: { data } }) => {
        state.loadingState = "success";
        libraryAdapter.setAll(state, data);
      });
  },
});

export const libraryReducer = librarySlice.reducer;
export const librarySelectors = libraryAdapter.getSelectors();
export const libraryActions = librarySlice.actions;
