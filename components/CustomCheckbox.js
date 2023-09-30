import React from 'react';
import Image from 'next/image';
import emptycheck from "../public/emptycheck.svg"
const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className="checkboxContainer">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox"
      />
      <span className="checkmark">
        <Image src={emptycheck} alt=''/>
      </span>
    </label>
  );
};

export default CustomCheckbox;
