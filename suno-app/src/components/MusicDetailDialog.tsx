import moment from "moment";
import { MdClose, MdPerson, MdPlayArrow } from "react-icons/md";

import usePlayer from "../composables/usePlayer";
import { LibraryAndAudioInfo } from "../lib/api/models";

type MusicDetailDialogProps = {
  library: LibraryAndAudioInfo;
  onClose: () => void;
};

export default function MusicDetailDialog({
  library: { library, audioInfo },
  onClose,
}: MusicDetailDialogProps) {
  const { isPlaying, toggle, playAudio } = usePlayer();

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-scroll z-10">
      <div className="h-full flex flex-col space-y-8 bg-stone-950 mt-18 pb-16 rounded-t-xl overflow-y-scroll">
        <div className="flex flex-col space-y-8 bg-green-950/50 px-8 pt-8 pb-10 rounded-t-xl">
          <div className="flex">
            <button onClick={onClose}>
              <MdClose className="text-xl" />
            </button>
          </div>
          <img
            src={audioInfo.image_url}
            alt={audioInfo.title}
            className="self-center w-64 h-64 bg-white rounded-md"
          />
          <h1 className="text-2xl font-bold">{audioInfo.title}</h1>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <MdPerson />
              <span className="hidden">typenonull</span>
            </div>
            <p>{audioInfo.tags}</p>
            <small className="opacity-80">
              {moment(audioInfo.created_at).format("MMMM Do YYYY")}
            </small>
          </div>
          <button
            className="self-start flex space-x-2 items-center bg-green-50/20 px-4 py-2 rounded-md"
            onClick={() => {
              const libraryAndAudioInfo = { audioInfo, library };
              playAudio(libraryAndAudioInfo);
            }}
          >
            <MdPlayArrow className="text-2xl" />
            <span>Play</span>
          </button>
        </div>
        <div className="flex-1 flex flex-col space-y-4 px-8  opacity-80">
          <p className="font-medium">Lyrics</p>
          <div className="flex flex-col space-y-6 whitespace-pre-line prose">
            {audioInfo.lyric.split(/(?=\[.*\])/i).map((lyric) => (
              <div>{lyric}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
