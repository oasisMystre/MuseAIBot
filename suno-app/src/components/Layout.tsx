import { Outlet } from "react-router";

import LayoutHeader from "./LayoutHeader";

export default function Layout() {
  return (
    <main className="fixed inset-0 flex flex-col bg-black text-white overflow-y-scroll">
      <div className="flex-1 flex flex-col bg-gradient-to-b from-green/10 to-black overflow-y-scroll">
        <LayoutHeader className="lt-md:order-last" />
        <div className="flex-1 flex  lt-md:order-first overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
