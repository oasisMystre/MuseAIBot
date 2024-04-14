import { MdPlayArrow } from "react-icons/md";

import usePlayer from "../composables/usePlayer";
import { LibraryAndAudioInfo } from "../lib/api/models";

import MusicItemMenu from "./MusicItemMenu";

type MusicItemProps = {
  item: LibraryAndAudioInfo;
  onSelected: React.Dispatch<React.SetStateAction<LibraryAndAudioInfo | null>>;
};

export default function MusicItem({ item, onSelected }: MusicItemProps) {
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
          className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full"
          onClick={() => {
            setQueue([item]);
            playAudio(item);
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
