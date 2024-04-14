import { useState } from "react";
import { MdSearch } from "react-icons/md";

import useExplore from "../composables/useExplore";
import { LibraryAndAudioInfo } from "../lib/api/models";

import Grid from "../components/elements/Grid";
import MusicItem from "../components/MusicItem";
import MusicListShim from "../components/MusicListShim";
import MusicDetailDialog from "../components/MusicDetailDialog";
import { useSearchParams } from "react-router-dom";
import Search from "../components/elements/Search";
import SearchEmpty from "../components/states/SearchEmpty";

export default function HomePage() {
  const { loadingState, libraries } = useExplore();
  const [selectedLibrary, setSelectedLibrary] =
    useState<LibraryAndAudioInfo | null>(null);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const filteredLibraries = libraries.filter((library) =>
    search ? library.audioInfo.title.includes(search!) : true
  );

  return (
    <main className="flex-1 flex flex-col space-y-4 p-4">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Home</h1>
        <Search />
      </div>
      {["pending", "idle"].includes(loadingState) && (
        <Grid>
          <MusicListShim />
        </Grid>
      )}
      {loadingState === "success" &&
        (filteredLibraries.length > 0 ? (
          <Grid>
            {filteredLibraries.map((library) => (
              <MusicItem
                key={library.library.id}
                item={library}
                onSelected={setSelectedLibrary}
              />
            ))}
          </Grid>
        ) : (
          <SearchEmpty />
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
