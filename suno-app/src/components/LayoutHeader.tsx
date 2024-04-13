import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdClose, MdMenu } from "react-icons/md";

import { layoutNavigations } from "../config/navigations";

export default function LayoutHeader({ className }: React.PropsWithClassName) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={clsx(className, "flex items-center md:space-x-2 p-4")}>
      <div className="">Header</div>
      <div
        className={clsx(
          "flex-1 lt-md:fixed lt-md:inset-0 lt-md:flex-col lt-md:bg-black/50 lt-md:z-100",
          menuOpen ? "flex" : "lt-md:hidden"
        )}
      >
        <div
          className={clsx(
            "flex lt-md:mt-auto lt-md:flex-col lt-md:space-y-4 lt-md:py-4 lt-md:max-h-auto lt-md:bg-stone-950 lt-md:rounded-t-xl md:flex-1 md:items-center md:justify-center md:space-x-2",
            { "animate-slide-in-up animate-duration-100": menuOpen }
          )}
        >
          <header className="flex items-center justify-end md:hidden">
            <button
              className="px-4"
              onClick={() => setMenuOpen(false)}
            >
              <MdClose className="text-xl" />
            </button>
          </header>
          <div className="flex lt-md:flex-col lt-md:flex-1">
            {layoutNavigations.map((navigation, index) => (
              <Link
                to={navigation.href}
                key={index}
                className="px-4 py-2 hover:bg-black/50 active:bg-stone-700/50 rounded-md lt-md:flex lt-md:items-center lt-md:space-x-4 lt-md:py-4"
                onClick={() => setMenuOpen(false)}
              >
                <i className="text-xl md:hidden">{navigation.icon}</i>
                <span>{navigation.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex lt-md:flex-1">
        <button
          className="ml-auto border border-stone-900 bg-stone-950 p-2 rounded-md md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <MdMenu className="text-xl" />
        </button>
      </div>
    </header>
  );
}
