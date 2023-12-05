import { ChangeEvent } from "react";

type InputTypes = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export const Input: React.FC<InputTypes> = ({
  value,
  onChange,
  type = "text",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="p-2 border border-neutral-600 rounded-lg shadow"
    />
  );
};
