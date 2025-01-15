import { useEffect } from "react";

import { useApi } from "./useApi";
import { useAppDispatch, useAppSelector } from "../store";
import {
  getUserLibraries,
  librarySelectors,
} from "../store/slices/librarySlice";

export default function useLibraries() {
  const api = useApi();
  const dispatch = useAppDispatch();

  const { loadingState, ...state } = useAppSelector((state) => state.library);
  const libraries = librarySelectors.selectAll(state);

  useEffect(() => {
    dispatch(getUserLibraries(api)).unwrap().catch(console.log);
  }, []);

  return {
    loadingState,
    libraries,
  };
}
