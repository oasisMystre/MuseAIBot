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
  const exploreAdapter = createEntityAdapter({
    selectId: (model: LibraryAndAudioInfo) => model.library.id,
  });
  
  export const exploreSlice = createSlice({
    name: "explore",
    initialState: exploreAdapter.getInitialState<LoadingState>({
      loadingState: "idle",
    }),
    reducers: {
      addMany: exploreAdapter.addMany,
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
          exploreAdapter.setAll(state, data);
        });
    },
  });
  
  export const exploreReducer = exploreSlice.reducer;
  export const exploreSelectors = exploreAdapter.getSelectors();
  export const exploreActions = exploreSlice.actions;
  