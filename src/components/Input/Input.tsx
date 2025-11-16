import * as S from "./Input.styles";

interface InputProps {
  type: string;
  label: string;
  placeholder?: string;
  name: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <S.InputComponent type={type}>
      <label htmlFor="name">{label}*</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </S.InputComponent>
  );
};

export default Input;
