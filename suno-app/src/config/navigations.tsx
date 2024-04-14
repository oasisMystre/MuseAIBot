import { MdHome, MdCreate, MdLibraryMusic } from "react-icons/md";

type Navigation = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

export const layoutNavigations: Navigation[] = [
  {
    name: "Library",
    href: "/",
    icon: <MdLibraryMusic />,
  },
  {
    name: "Create",
    href: "/create",
    icon: <MdCreate />,
  },
];
