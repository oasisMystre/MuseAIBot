import { MdPlayArrow } from "react-icons/md";

import usePlayer from "../composables/usePlayer";
import { LibraryAndAudioInfo } from "../lib/api/models";

import MusicItemMenu from "./MusicItemMenu";
import useLibraries from "../composables/useLibraries";
import { librarySelectors } from "../store/slices/librarySlice";
import { useAppSelector } from "../store";

type MusicItemProps = {
  item: LibraryAndAudioInfo;
  libraries: LibraryAndAudioInfo[];
  onSelected: React.Dispatch<React.SetStateAction<LibraryAndAudioInfo | null>>;
};

export default function MusicItem({
  libraries,
  item,
  onSelected,
}: MusicItemProps) {
  const { audioInfo } = item;
  const { setQueue, playAudio } = usePlayer();

  return (
    <div className="flex flex-col cursor-pointer transition-all active:scale-98">
      <div className="relative">
        <img
          src={audioInfo.image_url}
          className="w-full h-40 rounded-md sm:h-56 object-cover"
          onClick={() => onSelected(item)}
        />
        <MusicItemMenu item={item} />
        <button
          className="absolute bottom-2 right-2 bg-white p-2 rounded-full"
          onClick={() => {
            setQueue(libraries);
            playAudio(item);
          }}
        >
          <MdPlayArrow className="text-2xl text-black" />
        </button>
      </div>
      <div>
        <p>{audioInfo.title}</p>
      </div>
    </div>
  );
}
