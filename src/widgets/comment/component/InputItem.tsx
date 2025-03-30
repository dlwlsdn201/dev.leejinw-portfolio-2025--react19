import { ReactElement } from 'react';

interface InputItemProps {
  label: string;
  inputElement: ReactElement;
  isRequired?: boolean;
}

export const InputItem: React.FC<InputItemProps> = ({
  label,
  isRequired,
  inputElement,
}) => {
  return (
    <div className="flex flex-col justify-start">
      <div className="text-left">
        {isRequired && <span className="text-red-500 mr-1!">*</span>}
        {label}
      </div>
      {inputElement}
    </div>
  );
};
