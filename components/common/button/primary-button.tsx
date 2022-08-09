import React, { FC } from 'react';
import classNames from 'classnames';
import LoadingIcon from '../../../icons/LoadingIcon';

type ButtonProps = {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  children?: React.ReactChildren;
  onClick?: (e: any) => void;
};

const PrimaryButton: FC<ButtonProps> = ({
  text = 'Confirm',
  icon,
  className,
  loading,
  loadingText = 'LOADING',
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  const buttonClassName =
    className +
    classNames(
      loading || disabled
        ? ' bg-black hover:bg-[#121212] text-white cursor-not-allowed'
        : ' bg-black hover:bg-bg-[#121212] text-white',
      ' flex items-center rounded-full text-sm py-[6px] px-4 outline-0',
    );
  return (
    <button disabled={loading || disabled} className={buttonClassName} onClick={onClick} {...props}>
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

export default PrimaryButton;
