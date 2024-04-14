import { MdClose, MdPerson, MdPlayArrow } from "react-icons/md";
import { LibraryAndAudioInfo } from "../lib/api/models";

type MusicDetailDialogProps = {
  library: LibraryAndAudioInfo;
  onClose: () => void;
};

export default function MusicDetailDialog({
  library: { library, audioInfo },
  onClose,
}: MusicDetailDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-scroll z-100000">
      <div className="h-full flex flex-col space-y-8 bg-stone-950 mt-18 rounded-t-xl">
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
          <div>
            <div className="flex items-center space-x-2">
              <MdPerson />
              <span>typenonull</span>
            </div>
            <p>{audioInfo.tags}</p>
            <small className="opacity-80">{audioInfo.created_at}</small>
          </div>
          <button
            className="self-start flex space-x-2 items-center bg-green-50/20 px-4 py-2 rounded-md"
            onClick={() => {
              const audio = new Audio();
              audio.src = audioInfo.audio_url;
              audio.play();
            }}
          >
            <MdPlayArrow className="text-2xl" />
            <span>Play</span>
          </button>
        </div>
        <div className="whitespace-pre-line prose opacity-80 px-8">
          {audioInfo.lyric}
        </div>
      </div>
    </div>
  );
}
