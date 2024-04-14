import { useEffect } from "react";

import { useApi } from "./useApi";
import { useAppDispatch, useAppSelector } from "../store";
import { exploreSelectors, getLibraries } from "../store/slices/exploreSlice";

export default function useExplore() {
  const api = useApi();
  const dispatch = useAppDispatch();

  const { loadingState, ...state } = useAppSelector((state) => state.library);
  const libraries = exploreSelectors.selectAll(state);

  useEffect(() => {
    dispatch(getLibraries(api)).unwrap().catch(console.log);
  }, []);

  return {
    loadingState,
    libraries,
  };
}
