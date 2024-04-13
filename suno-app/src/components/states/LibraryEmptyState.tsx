import { Link } from "react-router-dom";
import { MdLibraryMusic } from "react-icons/md";

export default function LibraryEmptyState() {
  return (
    <div className="flex-1 flex flex-col space-y-2 items-center justify-center">
      <button className="bg-green-500 p-3 rounded-full">
        <MdLibraryMusic className="text-2xl" />
      </button>
      <div className="text-center">
        <h1 className="text-lg font-medium">No song found</h1>
        <p className="opacity-70">You don't have any song generated</p>
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
