export default function Grid({ children }: React.PropsWithChildren) {
  return (
    <div className="flex-1 grid grid-cols-3 grid-rows-4 gap-2 overflow-y-scroll md:grid-cols-5 md:grid-rows-3 xl:grid-cols-7">
      {children}
    </div>
  );
}
