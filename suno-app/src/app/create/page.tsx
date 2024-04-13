import { MdMusicNote } from "react-icons/md";
import CheckBox from "../../components/elements/CheckBox";

export default function CreatePage() {
  return (
    <main className="flex-1 flex flex-col">
      <main className="self-center min-w-xl flex flex-col space-y-8 p-4">
        <header>
          <h1 className="text-xl font-bold">Create</h1>
        </header>
        <div className="flex flex-col space-y-8">
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Title</label>
              <input
                className="input-border input-focus"
                placeholder="Enter a title"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm">Description</label>
              <textarea
                className="input-border input-focus"
                placeholder="an agressive k-pop song about writing a face-melting guitar solo"
              />
            </div>
            <CheckBox>
              <span>Instrumental</span>
            </CheckBox>
          </div>
          <button className="flex space-x-2 items-center justify-center bg-green-500 text-black py-2 rounded-md hover:bg-green-500/80 active:bg-green-500">
            <span>Create</span>
            <MdMusicNote className="text-xl" />
          </button>
        </div>
      </main>
    </main>
  );
}
