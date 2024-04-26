import { createContext, useEffect, useMemo, useState } from "react";

import { LibraryAndAudioInfo } from "../lib/api/models";

export type PlayerContextParams = {
  destroy: () => void,
  playAudio: (value: LibraryAndAudioInfo) => void;
  audio: HTMLAudioElement;
  previous: () => void;
  next: () => void;
  toggle: () => void;
  isPlaying: boolean;
  queue: LibraryAndAudioInfo[];
  currentPlaying: LibraryAndAudioInfo | null;
  setQueue: React.Dispatch<React.SetStateAction<LibraryAndAudioInfo[]>>;
};

export const PlayerContext = createContext<Partial<PlayerContextParams>>({});

export default function PlayerProvider({ children }: React.PropsWithChildren) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<LibraryAndAudioInfo[]>([]);
  const [currentPlaying, setCurrentPlaying] =
    useState<LibraryAndAudioInfo | null>(null);

  const audio = useMemo(() => new Audio(), []);

  const playAudio = function (libraryAndAudioInfo: LibraryAndAudioInfo) {
    audio.src = libraryAndAudioInfo.audioInfo.audio_url;
    audio.currentTime = 0;
    audio.play();

    setCurrentPlaying(libraryAndAudioInfo);
  };

  const next = function () {
    const currentIndex = queue.findLastIndex(
      (value) => currentPlaying!.library.id === value.library.id
    );

    if (currentIndex === queue.length) return;

    const nextIndex = currentIndex + 1;
    const libraryAndAudioInfo = queue[nextIndex]!;

    playAudio(libraryAndAudioInfo);
  };

  const previous = function () {
    const currentIndex = queue.findLastIndex(
      (value) => currentPlaying!.library.id === value.library.id
    );

    if (currentIndex === 0) return;

    const nextIndex = currentIndex - 1;
    const libraryAndAudioInfo = queue[nextIndex]!;

    playAudio(libraryAndAudioInfo);
  };

  const toggle = async function () {
    setIsPlaying(audio.paused);

    if (audio.paused) await audio.play();
    else audio.pause();
  };

  const destroy = function(){
    setCurrentPlaying(null);
    audio.pause();
    setQueue([]);
  }

  useEffect(() => {
    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => audio.remove();
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        destroy,
        currentPlaying,
        queue,
        audio,
        isPlaying,
        toggle,
        next,
        previous,
        setQueue,
        playAudio,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
