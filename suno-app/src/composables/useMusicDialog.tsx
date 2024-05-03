import { useContext } from "react";
import { MusicDetailContext } from "../providers/MusicDetailProvider";

export default function useMusicDialog(){
    return useContext(MusicDetailContext);
}