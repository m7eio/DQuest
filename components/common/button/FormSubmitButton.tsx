import React, { FC } from 'react';
import classNames from "classnames";
import LoadingIcon from '../../../icons/LoadingIcon';

type FormButtonProps = {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children?: React.ReactChildren;
  onClick?: () => void;
};

const FormSubmitButton: FC<FormButtonProps> = ({
  text = 'Confirm',
  icon,
  className,
  disabled = false,
  loading,
  loadingText = 'LOADING',
  children,
  ...props
}) => {
  const buttonClassName =
    className +
    classNames(
      loading || disabled
        ? ' bg-neutral-300 hover:bg-neutral-300 text-neutral-600 cursor-not-allowed'
        : ' bg-[#000] hover:bg-[#333] text-white',
      ' flex items-center rounded-full text-sm py-2.5 px-4 outline-none',
    );
  return (
    <button type="submit" disabled={loading || disabled} className={buttonClassName} {...props}>
      {loading ? (
        <>
          <LoadingIcon className="animate-spin mr-2" />
          {loadingText}
        </>
      ) : (
        <>
          {text}
          {icon}
        </>
      )}
      {children}
    </button>
  );
};

export default FormSubmitButton;
