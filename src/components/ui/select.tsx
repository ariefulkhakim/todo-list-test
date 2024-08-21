import { useState } from "react";

interface SelectCustomProps {
  setFilterStatus: (value: React.SetStateAction<string>) => void;
  filterStatus: string;
}
const SelectCustom = ({ filterStatus, setFilterStatus }: SelectCustomProps) => {
  const SelectCustomData = [
    {
      id: "1",
      label: "All",
      value: "all",
    },
    {
      id: "2",
      label: "Complete",
      value: "complete",
    },
    {
      id: "3",
      label: "Incomplete",
      value: "incomplete",
    },
  ];
  const [toggle, setToggle] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        className="relative cursor-default rounded-[5px] bg-brand py-2 pl-3 pr-10 text-left text-[#f7f7f7] shadow-sm ring-1 ring-inset ring-transparent focus:outline-none focus:ring-2 focus:ring-brand flex w-32"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        onClick={() => setToggle(!toggle)}
      >
        <span className="capitalize font-semibold text-[14px]">
          {filterStatus}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 pt-[2px]">
          <svg
            className="h-10 w-4 text-slate-100"
            viewBox="0 0 9 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // width="20"
            // height="20"
          >
            <path
              d="M4.63077 4L1.26154 1"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 1L4.63077 4"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          {/* <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clip-rule="evenodd"
            />
          </svg> */}
        </span>
      </button>

      {toggle && (
        <ul
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none sm:text-sm"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {SelectCustomData.map((res, key) => (
            <li
              key={key}
              className="transition relative cursor-default select-none py-2 text-primary ring-primary hover:bg-primary hover:text-slate-100"
              id="listbox-option-0"
              role="option"
              onClick={() => {
                setFilterStatus(res.value);
                setToggle(false);
              }}
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal">
                  {res.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectCustom;
