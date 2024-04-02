import React from "react";

interface EnterMoneyFieldProps {
  enteredMoney: string;
  setenteredMoney: (enteredMoney: string) => void;
  className?: string;
}
const EnterMoneyField: React.FC<EnterMoneyFieldProps> = ({
  enteredMoney,
  setenteredMoney,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setenteredMoney(!value || parseFloat(value) >= 0 ? value : enteredMoney);
  };
  return (
    <div>
      <input
        type="number"
        value={enteredMoney}
        onChange={handleChange}
        placeholder="Enter money"
      />
    </div>
  );
};

export default EnterMoneyField;
