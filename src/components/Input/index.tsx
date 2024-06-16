import React from 'react';

import { InputProps } from './Input.props';

import './Input.css';

export const Input: React.FC<InputProps> = ({type, forId, labelText, placeholder, icon, className}) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <div className="input-block">
      <label className="label" htmlFor={forId}>
        {labelText}
      </label>
      <div className="input-wrapper">
        <input onKeyDown={handleKeyDown} className={`input ${className}`} type={type} id={forId} placeholder={placeholder} />
        {icon}
      </div>
    </div>
  );
};
