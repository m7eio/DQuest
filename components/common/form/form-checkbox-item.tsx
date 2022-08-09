/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';

interface FormCheckoutboxItemProps {
  label?: string;
  labelClassName?: string;
  name: string;
  placeholder?: string;
  inputRef?: any;
  className?: string;
}

const FormCheckoutboxItem: FC<FormCheckoutboxItemProps> = ({
  label,
  labelClassName,
  name,
  placeholder,
  inputRef,
  className,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {label && (
        <label
          htmlFor={name}
          className={labelClassName || 'text-sm font-semibold text-neutral-800'}
        >
          {label}
        </label>
      )}
      <div className="relative bg-neutral-50 h-10 rounded-lg">
        <ErrorMessage
          name={name}
          component="div"
          className="absolute left-1 -bottom-6 text-sm text-neutral-400 select-none tracking-wider uppercase font-medium"
        />
        <Field name={name}>
          {({ field, meta }: FieldProps) => (
            <div>
              <label className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="checked-demo"
                  className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
                />
                <span className="text-gray-700 dark:text-white font-normal">Blue</span>
              </label>
              <label className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="checked-demo"
                  className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-pink-500 checked:border-transparent focus:outline-none"
                />
                <span className="text-gray-700 dark:text-white font-normal">Pink</span>
              </label>
            </div>
          )}
        </Field>
      </div>
    </div>
  );
};

export default FormCheckoutboxItem;
