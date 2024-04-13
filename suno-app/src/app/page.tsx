import { MdSearch } from "react-icons/md";
import MusicListShim from "../components/MusicListShim";

export default function HomePage() {
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
      <div className="flex-1 grid grid-cols-3 gap-2 overflow-y-scroll md:grid-cols-5 xl:grid-cols-7">
        <MusicListShim />
      </div>
    </main>
  );
}
