import { createContext, useState } from "react";

import type { Library } from "../lib/api/models";
import MusicDetailDialog from "../components/MusicDetailDialog";

type MusicDetailContext = {
  library: Library | null;
  setLibrary: React.Dispatch<React.SetStateAction<Library | null>>;
};

export const MusicDetailContext = createContext<MusicDetailContext>({
  library: null,
  setLibrary: () => void 0,
});

export default function MusicDetailProvider({
  children,
}: React.PropsWithChildren) {
  const [library, setLibrary] = useState<Library | null>(null);

  return (
    <MusicDetailContext.Provider value={{ library, setLibrary }}>
      {children}
      {library &&
        library.data.map((data) => (
          <MusicDetailDialog
            audio={data}
            onClose={() => setLibrary(null)}
          />
        ))}
    </MusicDetailContext.Provider>
  );
}
