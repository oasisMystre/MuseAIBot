import { MdHome, MdCreate, MdLibraryMusic } from "react-icons/md";

type Navigation = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

export const layoutNavigations: Navigation[] = [
  {
    name: "Home",
    href: "/",
    icon: <MdHome />,
  },
  {
    name: "Create",
    href: "/create",
    icon: <MdCreate />,
  },
  {
    name: "Library",
    href: "/library",
    icon: <MdLibraryMusic />,
  },
];
