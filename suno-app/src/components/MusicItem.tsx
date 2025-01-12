import { MdPlayArrow } from "react-icons/md";

import { Library } from "../lib/api/models";
import usePlayer from "../composables/usePlayer";
import useMusicDialog from "../composables/useMusicDialog";

import MusicItemMenu from "./MusicItemMenu";

type MusicItemProps = {
  item: Library;
  libraries: Library[];
};

export default function MusicItem({ libraries, item }: MusicItemProps) {
  const { setLibrary } = useMusicDialog();
  const { setQueue, playAudio } = usePlayer();

  return item.data.map((data) => (
    <div className="flex flex-col cursor-pointer transition-all active:scale-98">
      <div className="relative">
        <img
          src={data.imageUrl}
          className="w-full h-40 rounded-md sm:h-56 object-cover"
          onClick={() => setLibrary(item)}
        />
        <MusicItemMenu item={data} />
        <button
          className="absolute bottom-2 right-2 bg-white p-2 rounded-full"
          onClick={() => {
            setQueue(libraries.flatMap((library) => library.data));
            playAudio(...item.data);
          }}
        >
          <MdPlayArrow className="text-2xl text-black" />
        </button>
      </div>
      <div>
        <p>{data.title}</p>
      </div>
    </div>
  ));
}
