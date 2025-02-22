import { Menu } from "@headlessui/react";

import { toast } from "react-toastify";
import { MdMoreVert, MdShare, MdDelete } from "react-icons/md";

import { urlToFile } from "../lib/utils/file";
import { Audio } from "../lib/api/models";

type MusicItemMenuProps = {
  item: Audio;
};

export default function MusicItemMenu({ item }: MusicItemMenuProps) {
  const onShare = async () => {
    if (!("navigator" in window) || !navigator.share) return Promise.reject();

    const file = await urlToFile(item.audioUrl, item.title);
    const shareData = {
      files: [file],
    } satisfies ShareData;

    await navigator.share(shareData);
  };

  return (
    <Menu>
      <Menu.Button className="absolute top-2 right-2">
        <button className="p-1 bg-black/40 rounded-md">
          <MdMoreVert className="text-lg" />
        </button>
      </Menu.Button>

      <Menu.Items className="absolute top-10 w-36 flex flex-col divide-y divide-stone-700 bg-stone-900 z-20 rounded-md">
        <Menu.Item
          as="div"
          className="flex items-center space-x-2 px-2 py-4 cursor-pointer"
          onClick={async () => {
            await toast.promise(onShare(), {
              pending: "Please wait a moment",
              success: "Music shared successfully",
              error: "Failed to share file",
            });
          }}
        >
          <MdShare className="text-xl" />
          <span className="text-sm">Share</span>
        </Menu.Item>
        <Menu.Item
          as="div"
          className="hidden items-center space-x-2 px-2 py-4 cursor-pointer"
        >
          <MdDelete className="text-xl" />
          <span className="text-sm">Delete</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
