import { MdMoreVert, MdPlayArrow } from "react-icons/md";

export default function MusicList() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="relative"
        >
          <div className="w-full h-40 bg-red rounded-md md:h-48 xl:h-56" />
          <button className="absolute top-2 right-2 p-1 bg-black/40 rounded-md">
            <MdMoreVert className="text-lg" />
          </button>
          <button className="absolute bottom-2 right-2 bg-green-500 p-2 rounded-full">
            <MdPlayArrow className="text-2xl" />
          </button>
        </div>
      ))}
    </>
  );
}
