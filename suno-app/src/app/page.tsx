import { useSearchParams } from "react-router-dom";

import useLibraries from "../composables/useLibraries";

import Grid from "../components/elements/Grid";
import MusicItem from "../components/MusicItem";
import Search from "../components/elements/Search";
import MusicListShim from "../components/MusicListShim";
import LibraryEmptyState from "../components/states/LibraryEmptyState";

export default function LibraryPage() {
  const { loadingState, libraries } = useLibraries();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const filteredLibraries = libraries.filter((library) =>
    search
      ? library.data.some((data) =>
          data.title.toLowerCase().includes(search!.toLowerCase()),
        ) ||
        library.data.some((data) =>
          data.tags.toLowerCase().includes(search!.toLowerCase()),
        )
      : true,
  );

  return (
    <main className="flex-1 flex flex-col space-y-4 p-4">
      <header className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Library</h1>
        {libraries.length > 0 && <Search />}
        <div>
          <button className="flex items-center space-x-2 border-b-2 p-2">
            <span className="flex-1">Songs</span>
          </button>
        </div>
      </header>
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
                key={library.id}
                item={library}
                libraries={filteredLibraries}
              />
            ))}
          </Grid>
        ) : (
          <LibraryEmptyState />
        ))}
    </main>
  );
}
