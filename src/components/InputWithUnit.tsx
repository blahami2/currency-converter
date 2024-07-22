import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding-right: 10px;
  margin: 10px 0;
  padding: 10px;
`;

const UnitContainer = styled.span`
  margin-left: -60px;
  padding-right: 35px;
  padding-left: 0px;
  pointer-events: none; /* Make sure the unit is not interactive */
  font-size: 14px;
  color: #666;
`;

interface InputWithUnitProps extends React.InputHTMLAttributes<HTMLInputElement> {
  unit: string;
  regexp?: RegExp;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithUnit: React.FC<InputWithUnitProps> = ({ unit, regexp, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (regexp && regexp.test(value)) {
      onChange?.(e);
    }
  };

  return (
    <div className={props.className}>
      <InputContainer>
        <Input {...props} onChange={handleChange} />
        <UnitContainer>{unit}</UnitContainer>
      </InputContainer>
    </div>
  );
};

export default InputWithUnit;
