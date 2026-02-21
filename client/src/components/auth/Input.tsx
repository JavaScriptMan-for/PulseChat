import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: string;
  alt: string;
  registration: UseFormRegisterReturn;
  children: string
}

const Input: FC<Props> = ({ icon, alt, registration, children, ...rest }) => {
  return (
    <div className="input-box">
      <img src={icon} alt={alt} />
      <input
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...registration}
        {...rest}
        placeholder={children}/>
    </div>
  );
};

export default Input;