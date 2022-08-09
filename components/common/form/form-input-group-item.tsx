/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';

import { SBT_MAP } from '@/common/const';
import LoadingIcon from '@/icons/LoadingIcon';

interface FormInputGroupItemProps {
  label?: string;
  labelClassName?: string;
  name: string;
  placeholder?: string;
  inputRef?: any;
  className?: string;
  validateAuth: (value?: number) => void;
  loading?: boolean;
}

const FormInputGroupItem: FC<FormInputGroupItemProps> = ({
  label,
  labelClassName,
  name,
  placeholder,
  inputRef,
  className,
  validateAuth,
  loading,
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
      <div className="relative h-10 rounded-lg">
        <ErrorMessage
          name={name}
          component="div"
          className="absolute left-3 -bottom-6 text-sm text-neutral-400 select-none tracking-wider uppercase font-medium whitespace-nowrap"
        />
        <Field name={name}>
          {({ field, form, meta }: FieldProps) => (
            <div className="flex-horizontal justify-between">
              <label className="block text-sm font-medium shrink-0 mr-2">Token</label>
              <div className="relative rounded-md bg-neutral-50 w-full h-[40px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm"> $ </span>
                </div>
                <input
                  type="text"
                  name="price"
                  maxLength={18}
                  id="price"
                  onChange={(val) => {
                    const { value } = val.target;
                    form.setFieldValue(name, [value, field.value[1]]);
                  }}
                  onBlur={() => {
                    validateAuth(+form.getFieldProps(name).value[0] || 0);
                  }}
                  className={`h-[40px] focus:ring-green-500 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md placeholder:text-[#A6A5A5] placeholder:font-light 
                  ${
                    meta.touched && meta.error
                      ? '!border !border-red-500 focus:!border-none focus:!ring-red-500'
                      : 'border-none focus:ring-green-500'
                  }
                  `}
                  placeholder="0.00"
                ></input>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label className="sr-only">Currency</label>
                  <select
                    id="currency"
                    name="currency"
                    onChange={(val) => {
                      const { value } = val.target;
                      form.setFieldValue(name, [field.value[0], value]);
                    }}
                    className="focus:ring-[transparent] focus:border-[transparent] h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                  >
                    {SBT_MAP.map((item: any) => (
                      <option key={item[1]} value={item[1]}>
                        {item[0]}
                      </option>
                    ))}
                  </select>
                </div>
                {loading && (
                  <div className="absolute -right-[24px] top-1/2 -translate-y-1/2">
                    <LoadingIcon width={20} height={20} className="animate-spin" />
                  </div>
                )}
              </div>
            </div>
          )}
        </Field>
      </div>
      <div className="text-[#cfcfcf] ml-1 mt-2 font-normal text-sm">
        <a href="https://pob.work" target="_blank" rel="noreferrer">
          POB
        </a>{' '}
        will charge 5% commission.
      </div>
    </div>
  );
};

export default FormInputGroupItem;
