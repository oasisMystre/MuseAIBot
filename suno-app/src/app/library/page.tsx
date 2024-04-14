import useLibraries from "../../composables/useLibraries";

import MusicItem from "../../components/MusicItem";
import Grid from "../../components/elements/Grid";
import MusicListShim from "../../components/MusicListShim";
import LibraryEmptyState from "../../components/states/LibraryEmptyState";
import { useState } from "react";
import { LibraryAndAudioInfo } from "../../lib/api/models";
import MusicDetailDialog from "../../components/MusicDetailDialog";

export default function LibraryPage() {
  const { loadingState, libraries } = useLibraries();
  const [selectedLibrary, setSelectedLibrary] =
    useState<LibraryAndAudioInfo | null>(null);

  return (
    <main className="flex-1 flex flex-col space-y-4 p-4">
      <header className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Library</h1>
        <div>
          <button className="flex items-center space-x-2 border-b-2 p-2">
            <span className="flex-1">Songs</span>
            <div className="hidden w-6 h-6 flx items-center justify-center text-sm bg-green p-1 rounded-full">
              1
            </div>
          </button>
        </div>
      </header>
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
          <LibraryEmptyState />
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
