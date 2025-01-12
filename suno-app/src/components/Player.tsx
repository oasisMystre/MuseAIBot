import { useEffect, useMemo, useState } from "react";
import {
  MdClose,
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

import usePlayer from "../composables/usePlayer";
import useLibraries from "../composables/useLibraries";
import useMusicDialog from "../composables/useMusicDialog";

export default function Player() {
  const { setLibrary } = useMusicDialog();
  const { libraries } = useLibraries();
  const { audio, destroy, currentPlaying, next, previous, toggle, isPlaying } =
    usePlayer();
  const [seekPercentage, setSeekPercentage] = useState(0);

  const library = useMemo(() => {
    return (
      libraries.find((library) =>
        library.data.some((data) => data.id === currentPlaying?.id),
      ) ?? null
    );
  }, [libraries, currentPlaying]);

  const onPlaying = function () {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    setSeekPercentage((currentTime / duration) * 100);
  };

  useEffect(() => {
    audio.addEventListener("timeupdate", onPlaying);

    return () => {
      audio.removeEventListener("timeupdate", onPlaying);
    };
  }, []);

  return (
    currentPlaying && (
      <div>
        <button
          className="ml-2 mb-2 bg-white text-black p-1 rounded-full "
          onClick={destroy}
        >
          <MdClose />
        </button>
        <div className="flex flex-col bg-stone-900 z-20">
          <div className="bg-stone-700/50">
            <div
              style={{ width: `${seekPercentage}%` }}
              className="bg-white p-0.2 transition-width"
            />
          </div>
          <div className="flex space-x-2 items-center px-4 py-2">
            <div
              className="flex-1 flex space-x-2 items-center"
              onClick={() => setLibrary(library)}
            >
              <img
                src={currentPlaying.imageUrl}
                className="w-12 h-12 rounded"
              />
              <div className="flex flex-col">
                <p>{currentPlaying.title}</p>
                <p className="text-sm opacity-80">{currentPlaying.tags}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-stone-700 p-2 rounded-full"
                onClick={previous}
              >
                <MdSkipPrevious className="text-xl" />
              </button>
              <button
                className="bg-white text-black p-2 rounded-full"
                onClick={toggle}
              >
                {isPlaying ? (
                  <MdPause className="text-xl" />
                ) : (
                  <MdPlayArrow className="text-xl" />
                )}
              </button>
              <button
                className="bg-stone-700 p-2 rounded-full"
                onClick={next}
              >
                <MdSkipNext className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
