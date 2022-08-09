import React, { FC } from 'react';

type FormButtonProps = {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactChildren;
};

const FormDiscardButton: FC<FormButtonProps> = ({
  text = 'Discard',
  icon,
  className,
  children,
  ...props
}) => {
  const buttonClassName = `${className} flex items-center rounded-full text-sm py-2.5 px-4 bg-neutral-400 text-white outline-none`;
  return (
    <button type="reset" className={buttonClassName} {...props}>
      {text}
      {icon}
    </button>
  );
};

export default FormDiscardButton;
