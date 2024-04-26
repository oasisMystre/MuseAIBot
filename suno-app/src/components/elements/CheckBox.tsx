import clsx from "clsx";
import { Field, useFormik, useFormikContext } from "formik";

type CheckBoxProps = { name: string } & React.PropsWithChildren &
  React.PropsWithClassName;

export default function CheckBox({ name, className, children }: CheckBoxProps) {
  const { setFieldValue, values } = useFormikContext<{
    [key: string]: boolean;
  }>();

  return (
    <label className={clsx("flex items-center cursor-pointer")}>
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={(event) => setFieldValue(name, event.target.checked)}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-white dark:peer-focus:ring-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-black after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
      <div className="flex-1 flex flex-col ml-2">{children}</div>
    </label>
  );
}
