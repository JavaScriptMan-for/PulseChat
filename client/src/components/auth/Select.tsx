import { FC,  useState } from "react";
import type { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { RegisterData } from "@types-my/form.type";

interface Option {
  label: string;
  value: string;
}

interface Props {
  icon: string;
  alt: string;
  placeholder: string;
  options: Option[];
  registration: UseFormRegisterReturn;
  setValue: UseFormSetValue<RegisterData>;
}


const Select: FC<Props> = ({ icon, placeholder, options, registration, alt, setValue }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

const handleSelect = (value: string) => {
  setSelected(value);
  setValue(registration.name as keyof RegisterData, value); // <-- вот это ключ
  setOpen(false);
};

  return (
    <div className="select-wrapper">
      <div
        className={`select-box ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <img src={icon} alt={alt} className="select-icon" />

        <span className={`placeholder ${selected ? "active" : ""}`}>
          {selected
            ? options.find((o) => o.value === selected)?.label
            : placeholder}
        </span>

        <span className="arrow" />
      </div>
    
      {open && (
        <ul className="options">
          {options.map((opt) => (
            <li
              key={opt.value}
              className="option"
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
  
      {/* скрытый input для RHF */}
      <input type="hidden" {...registration} value={selected} />
    </div>
  );
};

export default Select;