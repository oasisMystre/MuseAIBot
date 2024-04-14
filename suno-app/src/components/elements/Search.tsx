import { useRef } from "react";
import { MdSearch } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const timer = useRef<Timer>();
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center bg-black/50 px-2 rounded-md focus-within:ring-3 ring-green-300">
      <MdSearch />
      <input
        className="flex-1 bg-transparent p-2 !outline-none"
        placeholder="Search with name, tags"
        onChange={(event) => {
          window.clearTimeout(timer.current);
          const value = event.target.value;

          timer.current = setTimeout(() => {
            if (value.trim().length > 2)
              setSearchParams({
                search: event.target.value,
              });
            else setSearchParams({});
          }, 500);
        }}
      />
    </div>
  );
}
