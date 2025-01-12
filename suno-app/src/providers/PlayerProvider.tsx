import { createContext, useEffect, useMemo, useState } from "react";

import type { Audio } from "../lib/api/models";

export type PlayerContextParams = {
  destroy: () => void;
  playAudio: (...value: Audio[]) => void;
  audio: HTMLAudioElement;
  previous: () => void;
  next: () => void;
  toggle: () => void;
  isPlaying: boolean;
  queue: Audio[];
  currentPlaying: Audio | null;
  setQueue: React.Dispatch<React.SetStateAction<Audio[]>>;
};

export const PlayerContext = createContext<Partial<PlayerContextParams>>({});

export default function PlayerProvider({ children }: React.PropsWithChildren) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Audio[]>([]);
  const [currentPlaying, setCurrentPlaying] = useState<Audio | null>(null);

  const audio = useMemo(() => new Audio(), []);

  const playAudio = function (...values: Audio[]) {
    setQueue((queue) => [...queue, ...values]);
    if (values.length > 0) {
      const [value] = values;
      audio.src = value.audioUrl;
      audio.currentTime = 0;
      audio.play();

      setCurrentPlaying(value);
    }
  };

  const next = function () {
    const currentIndex = queue.findLastIndex(
      (value) => currentPlaying?.id === value.id,
    );

    if (currentIndex === queue.length) return;

    const nextIndex = currentIndex + 1;
    const libraryAndAudioInfo = queue[nextIndex]!;

    playAudio(libraryAndAudioInfo);
  };

  const previous = function () {
    const currentIndex = queue.findLastIndex(
      (value) => currentPlaying?.id === value.id,
    );

    if (currentIndex === 0) return;

    const nextIndex = currentIndex - 1;
    const audio = queue[nextIndex]!;

    playAudio(audio);
  };

  const toggle = async function () {
    setIsPlaying(audio.paused);

    if (audio.paused) await audio.play();
    else audio.pause();
  };

  const destroy = function () {
    setCurrentPlaying(null);
    audio.pause();
    setQueue([]);
  };

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
