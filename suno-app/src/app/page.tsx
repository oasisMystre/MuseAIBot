import { useState } from "react";
import { MdSearch } from "react-icons/md";

import useExplore from "../composables/useExplore";
import { LibraryAndAudioInfo } from "../lib/api/models";

import Grid from "../components/elements/Grid";
import MusicItem from "../components/MusicItem";
import MusicListShim from "../components/MusicListShim";
import MusicDetailDialog from "../components/MusicDetailDialog";

export default function HomePage() {
  const { loadingState, libraries } = useExplore();
  const [selectedLibrary, setSelectedLibrary] =
    useState<LibraryAndAudioInfo | null>(null);

  return (
    <main className="flex-1 flex flex-col space-y-4 p-4">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Home</h1>
        <div className="flex items-center bg-black/50 px-2 rounded-md focus-within:ring-3 ring-green-300">
          <MdSearch />
          <input
            className="flex-1 bg-transparent p-2 !outline-none"
            placeholder="Search with name, tags"
          />
        </div>
      </div>
      {["pending", "idle"].includes(loadingState) && (
        <Grid>
          <MusicListShim />
        </Grid>
      )}
      {loadingState === "success" &&
        (libraries.length > 0 ? (
          <Grid>
            {libraries.map((library) => (
              <MusicItem
                key={library.library.id}
                item={library}
                onSelected={setSelectedLibrary}
              />
            ))}
          </Grid>
        ) : (
          <MusicListShim />
        ))}

      {selectedLibrary && (
        <MusicDetailDialog
          library={selectedLibrary}
          onClose={() => setSelectedLibrary(null)}
        />
      )}
    </main>
  );
}
