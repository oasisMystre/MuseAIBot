import MusicListShim from "../../components/MusicListShim";

export default function LibraryPage() {
  return (
    <main className="flex-1 flex flex-col space-y-4 p-4">
      <header className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Library</h1>
        <div>
          <button className="flex items-center space-x-2 border-b-2 p-2">
            <span className="flex-1">Songs</span>
            <div className="w-6 h-6 flex items-center justify-center text-sm bg-green-500 p-1 rounded-full">
              1
            </div>
          </button>
        </div>
      </header>
      <div className="flex-1 grid grid-cols-3 gap-2 overflow-y-scroll md:grid-cols-5 xl:grid-cols-7">
        <MusicListShim />
      </div>
    </main>
  );
}
