import { useContext } from "react";

import {
  PlayerContext,
  PlayerContextParams,
} from "../providers/PlayerProvider";

export default function usePlayer() {
  return useContext(PlayerContext) as unknown as PlayerContextParams;
}
