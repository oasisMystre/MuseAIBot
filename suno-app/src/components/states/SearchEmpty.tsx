import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

export default function SearchEmpty() {
  return (
    <div className="flex-1 flex flex-col space-y-2 items-center justify-center">
      <button className="bg-lime-500 p-3 rounded-full">
        <MdSearch className="text-2xl" />
      </button>
      <div className="text-center">
        <h1 className="text-lg font-medium">No song found</h1>
        <p className="opacity-70">We can't find any song with the keyword.</p>
      </div>
      <Link
        to="/create"
        className="btn btn-outline"
      >
        Create Song
      </Link>
    </div>
  );
}
