/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';

interface FormInputItemProps {
  label?: string;
  labelClassName?: string;
  name: string;
  readOnly?: boolean;
  placeholder?: string;
  inputRef?: any;
  className?: string;
  maxLength?: string | number;
}

const FormInputItem: FC<FormInputItemProps> = ({
  label,
  labelClassName,
  name,
  readOnly,
  placeholder,
  inputRef,
  className,
  maxLength,
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
      <div className="relative bg-neutral-50 h-32 rounded-lg">
        <ErrorMessage
          name={name}
          component="div"
          className="absolute left-1 -bottom-6 text-sm text-neutral-400 select-none tracking-wider uppercase font-medium"
        />
        <Field name={name}>
          {({ field, meta }: FieldProps) => (
            <>
              {maxLength && (
                <div className="text-sm font-thin text-neutral-400 select-none absolute right-3 bottom-1">
                  <span className={`${meta.error ? 'text-red-500' : ''}`}>
                    {field.value?.length}
                  </span>
                  /{maxLength}
                </div>
              )}

              <textarea
                className={`absolute top-0 left-0 w-full h-full bg-transparent text-neutral-800 placeholder:text-[#A6A5A5] placeholder:font-light rounded-lg text-sm font-thin py-1.5 p-2 focus:ring-1 resize-none
              ${
                meta.touched && meta.error
                  ? 'border border-red-500 focus:border-none focus:ring-red-500'
                  : 'border-none focus:ring-green-500'
              }`}
                ref={inputRef}
                readOnly={readOnly}
                placeholder={placeholder}
                {...field}
              />
            </>
          )}
        </Field>
      </div>
    </div>
  );
};

export default FormInputItem;
