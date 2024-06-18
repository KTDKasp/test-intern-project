import React from 'react';
import { InputProps } from '../Input/Input.props';
import { Input } from '../Input';

import './PasswordInput.css';
import { FieldError } from 'react-hook-form';

export const MyInput: React.FC<{
  forId: string;
  label: string;
  errorClassName?: FieldError | undefined;
}> = React.forwardRef(
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
            className={`${errorClassName ? 'input input__error' : 'input'}`}
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

export const PasswordInput: React.FC<InputProps> = ({
  type,
  forId,
  labelText,
  placeholder,
}) => {
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
            <button
              onKeyDown={(e) => e.preventDefault()}
              onClick={(e) => handleShowPassword(e)}
              className="password-input__button"
            >
              <img src="./svg/visibility.svg" alt="Visibility Icon" />
            </button>
          ) : (
            <button
              onKeyDown={(e) => e.preventDefault()}
              onClick={(e) => handleShowPassword(e)}
              className="password-input__button"
            >
              <img src="./svg/visibility-off.svg" alt="Visibility Off Icon" />
            </button>
          )
        }
      />
    </>
  );
};
