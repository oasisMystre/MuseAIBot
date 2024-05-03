import { createContext, useState } from "react";

import type { LibraryAndAudioInfo } from "../lib/api/models";
import MusicDetailDialog from "../components/MusicDetailDialog";

type MusicDetailContext = {
  library: LibraryAndAudioInfo | null;
  setLibrary: React.Dispatch<React.SetStateAction<LibraryAndAudioInfo | null>>;
};

export const MusicDetailContext = createContext<MusicDetailContext>({
  library: null,
  setLibrary: () => void 0,
});

export default function MusicDetailProvider({
  children,
}: React.PropsWithChildren) {
  const [library, setLibrary] = useState<LibraryAndAudioInfo | null>(null);

  return (
    <MusicDetailContext.Provider value={{ library, setLibrary }}>
      {children}
      {library && (
        <MusicDetailDialog
          library={library}
          onClose={() => setLibrary(null)}
        />
      )}
    </MusicDetailContext.Provider>
  );
}
