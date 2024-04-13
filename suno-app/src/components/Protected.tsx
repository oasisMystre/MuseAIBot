import { MdLock } from "react-icons/md";

export default function Protected() {
  return (
    <div className="m-auto flex flex-col space-y-4">
      <div className="self-center w-12 h-12 flex items-center justify-center bg-green p-2 rounded-full">
        <MdLock className="text-2xl" />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-medium">Invalid context</h1>
        <p className="text-sm opacity-80">
          Please open webapp with our telegram bot
        </p>
      </div>
      <button className="border border-green text-green rounded-md py-2">
        Open bot
      </button>
    </div>
  );
}
