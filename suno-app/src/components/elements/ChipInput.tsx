import { useFormikContext } from "formik";
import { MdCancel } from "react-icons/md";

type ChipInputProps = {
  name: string;
  label: string;
  placeholder: string;
} & React.PropsWithChildren;

export default function ChipInput({
  name,
  label,
  placeholder,
  children
}: ChipInputProps) {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: string[];
  }>();

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <label>{label}</label>
        <div className="flex space-x-2 flex-wrap items-center input-border input-focus !p-0">
          {values[name] && (
            <div className="flex items-center space-x-2  space-y-2 p-2 flex-wrap">
              {values[name].map((value) => (
                <button
                  type="button"
                  className="flex items-center space-x-2 border border-white/50 rounded px-2 py-1"
                >
                  <span>{value}</span>
                  <MdCancel
                    onClick={() => {
                      setFieldValue(
                        name,
                        values[name].filter((el) => el !== value)
                      );
                    }}
                  />
                </button>
              ))}
            </div>
          )}
          <div
            contentEditable
            className="min-w-24 py-2"
            data-placeholder={placeholder}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                let value = event.currentTarget.textContent;
                if (value && value.trim().length > 0)
                  setFieldValue(name, values[name].concat(value));

                event.currentTarget.innerHTML = "";
              }
            }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
