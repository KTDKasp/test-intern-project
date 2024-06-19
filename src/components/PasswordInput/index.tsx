import React from 'react';
import { FieldError } from 'react-hook-form';

import './PasswordInput.css';

export type CustomInput = {
  forId: string;
  label: string;
  errorClassName?: FieldError | undefined;
};


export const PasswordInput: React.FC<CustomInput> = React.forwardRef(
  (
    { forId, label, errorClassName, ...rest },
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShowPassword((prev) => !prev);
    };

    return (
      <>
        <label className="label" htmlFor={forId}>
          {label}
        </label>
        <div className="input-wrapper">
          <input
            className={`input password-input ${errorClassName ? 'input__error' : ''}`}
            {...rest}
            type={showPassword ? 'text' : 'password'}
            id={forId}
            placeholder="******"
            ref={ref}
          />
          <button
            onKeyDown={(e) => e.preventDefault()}
            onClick={(e) => toggleShowPassword(e)}
            className="password-input__button"
          >
            <img src={showPassword ? "./svg/visibility.svg" : "./svg/visibility-off.svg"} alt="Visibility Icon" />
          </button>
        </div>
      </>
    );
  }
);
