import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
  } from "@reduxjs/toolkit";
  
  import { Api } from "../../lib/api";
  import type { Library } from "../../lib/api/models";
  
  import type { LoadingState } from "../types";
  
  export const getLibraries = createAsyncThunk(
    "libraries/getUserLibraries",
    (api: Api) => api.library.getLibraries()
  );
  const exploreAdapter = createEntityAdapter({
    selectId: (model: Library) => model.id,
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
        .addCase(getLibraries.pending, (state) => {
          state.loadingState = "pending";
        })
        .addCase(getLibraries.rejected, (state) => {
          state.loadingState = "failed";
        })
        .addCase(getLibraries.fulfilled, (state, { payload: { data } }) => {
          state.loadingState = "success";
          exploreAdapter.setAll(state, data.results);
        });
    },
  });
  
  export const exploreReducer = exploreSlice.reducer;
  export const exploreActions = exploreSlice.actions;
  export const exploreSelectors = exploreAdapter.getSelectors();
  