import { MdMoreVert, MdPlayArrow } from "react-icons/md";

import usePlayer from "../composables/usePlayer";
import { LibraryAndAudioInfo } from "../lib/api/models";

type MusicItemProps = {
  item: LibraryAndAudioInfo;
  onSelected: React.Dispatch<React.SetStateAction<LibraryAndAudioInfo | null>>;
};

export default function MusicItem({
  item: { audioInfo, library },
  onSelected,
}: MusicItemProps) {
  const {
    audio,
    setQueue,
    playAudio,
    currentPlaying,
    next,
    previous,
    toggle,
    isPlaying,
  } = usePlayer();

  return (
    <div
      className="flex flex-col cursor-pointer transition-all active:scale-98"
      onClick={() => onSelected({ audioInfo, library })}
    >
      <div className="relative h-40">
        <img
          src={audioInfo.image_url}
          className="w-full h-full rounded-md md:h-48 xl:h-56"
        />
        <button className="absolute top-2 right-2 p-1 bg-black/40 rounded-md">
          <MdMoreVert className="text-lg" />
        </button>
        <button
          className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            const libraryAndAudioInfo = { audioInfo, library };
            setQueue([libraryAndAudioInfo]);
            playAudio(libraryAndAudioInfo);
          }}
        >
          <MdPlayArrow className="text-2xl" />
        </button>
      </div>
      <div>
        <p>{audioInfo.title}</p>
      </div>
    </div>
  );
}
