/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';

interface FormRadioItemProps {
  label?: string;
  labelClassName?: string;
  name: string;
  placeholder?: string;
  inputRef?: any;
  className?: string;
}
// eslint-disable-next-line
export enum modeType {
  SINGLE = 'SINGLE',
  MULTI = 'MULTI',
}

const FormRadioItem: FC<FormRadioItemProps> = ({
  label,
  labelClassName,
  name,
  placeholder,
  inputRef,
  className,
  ...props
}) => {
  const [mode, setMode] = useState(modeType.SINGLE);
  const handleChange = (value: modeType) => {
    setMode(value);
  };

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
      <div className="relative h-10 rounded-lg">
        <ErrorMessage
          name={name}
          component="div"
          className="absolute left-1 -bottom-6 text-sm text-neutral-400 select-none tracking-wider uppercase font-medium"
        />
        <Field name={name}>
          {({ field, form, meta }: FieldProps) => (
            <div className="flex-horizontal justify-start space-x-4">
              <div
                onClick={() => {
                  console.log(53, name, field, meta);
                  handleChange(modeType.SINGLE);
                  form.setFieldValue(name, modeType.SINGLE);
                }}
                className="flex-horizontal space-x-1 cursor-pointer"
              >
                <div className="w-[16px] h-[16px] rounded-full border-2 border-[#FFB805] p-0.5 flex-horizontal">
                  {mode === modeType.SINGLE && (
                    <div className="w-[8px] h-[8px] bg-[#FFB805] rounded-full"></div>
                  )}
                </div>
                <div>One Person</div>
              </div>
              <div
                onClick={() => {
                  console.log(64, name, field, form);
                  handleChange(modeType.MULTI);

                  form.setFieldValue(name, modeType.MULTI);
                }}
                className="flex-horizontal space-x-1 cursor-pointer"
              >
                <div className="w-[16px] h-[16px] rounded-full border-2 border-[#FFB805] p-0.5 flex-horizontal">
                  {mode === modeType.MULTI && (
                    <div className="w-[8px] h-[8px] bg-[#FFB805] rounded-full"></div>
                  )}
                </div>
                <div>Multiple People</div>
              </div>
            </div>
          )}
        </Field>
      </div>
    </div>
  );
};

export default FormRadioItem;
