import { MdMoreVert, MdPlayArrow } from "react-icons/md";

export default function MusicListShim() {
  return (
    <>
      {Array.from({ length: 24 }).map((_, index) => (
        <div
          key={index}
          className="relative"
        >
          <div className="w-full h-40 bg-stone-900 animate-pulse rounded-md md:h-48 xl:h-56" />
          <button className="absolute top-2 right-2 p-1 py-2 bg-black/30 animate-pulse rounded-sm">
          </button>
          <button className="absolute bottom-2 right-2 bg-green-500/10 animate-pulse p-5 rounded-full" />
        </div>
      ))}
    </>
  );
}
