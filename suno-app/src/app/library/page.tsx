import { MdLibraryMusic } from "react-icons/md";
import Grid from "../../components/elements/Grid";
import MusicListShim from "../../components/MusicListShim";
import useLibraries from "../../composables/useLibraries";
import LibraryEmptyState from "../../components/states/LibraryEmptyState";

export default function LibraryPage() {
  const { loadingState, libraries } = useLibraries();

  return (
    <main className="flex-1 flex flex-col space-y-4 p-4">
      <header className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Library</h1>
        <div>
          <button className="flex items-center space-x-2 border-b-2 p-2">
            <span className="flex-1">Songs</span>
            <div className="w-6 h-6 flex items-center justify-center text-sm bg-green p-1 rounded-full">
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
            <MusicListShim />
          </Grid>
        ) : (
          <LibraryEmptyState />
        ))}
    </main>
  );
}
