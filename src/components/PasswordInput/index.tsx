import React from 'react';
import { InputProps } from '../Input/Input.props';
import { Input } from '../Input';

import './PasswordInput.css';

export const PasswordInput: React.FC<InputProps> = ({type, forId, labelText, placeholder}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();  
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Input
        onKeyDown={(e) => e.preventDefault()}
        type={showPassword ? 'text' : type}
        forId={forId}
        labelText={labelText}
        placeholder={placeholder}
        className="password-input"
        icon={
          showPassword ? (
            <button onKeyDown={(e) => e.preventDefault()} onClick={(e) => handleShowPassword(e)} className='password-input__button'>
              <img src="./svg/visibility.svg" alt="Visibility Icon" />
            </button>
          ) : (
            <button onKeyDown={(e) => e.preventDefault()} onClick={(e) => handleShowPassword(e)} className='password-input__button'>
              <img src="./svg/visibility-off.svg" alt="Visibility Off Icon" />
            </button>
          )
        }
      />
    </>
  );
};
