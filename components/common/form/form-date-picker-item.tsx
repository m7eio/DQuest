/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, FC, useState } from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import DatePicker from 'react-datepicker';
import { Popover, Transition } from '@headlessui/react';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import 'react-datepicker/dist/react-datepicker.css';


interface FormProjectSelectItemProps {
  label?: string;
  labelClassName?: string;
  name: string;
  placeholder?: string;
  inputRef?: any;
  className?: string;
}

const FormDatePickerItem: FC<FormProjectSelectItemProps> = ({
  label,
  labelClassName,
  name,
  placeholder,
  inputRef,
  className,
  ...props
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleMouseEnter = function () {
    setShowTooltip(true);
  };
  const handleMouseOut = function () {
    setShowTooltip(false);
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
          {({ field, form, meta }: FieldProps) => {
            return (
              <div className="flex-horizontal">
                <DatePicker
                  placeholderText={'Start Date'}
                  className={`px-3 py-2 w-full rounded-lg focus:!ring-green-500 border-0 placeholder:text-[#A6A5A5] placeholder:font-light text-sm	
                ${
                  meta.touched && meta.error
                    ? '!border border-red-500 focus:!border-none focus:!ring-red-500'
                    : 'border-none focus:ring-green-500'
                }`}
                  selected={startDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="yyyy:MM:dd HH:mm:ss"
                  onChange={(date: any) => {
                    setStartDate(date);
                    const timeStamp = new Date(date).getTime();
                    if (timeStamp > +field.value[1]) {
                      setEndDate(null);
                      form.setFieldValue(name, [timeStamp, '']);
                    } else {
                      form.setFieldValue(name, [timeStamp, field.value[1]]);
                    }
                  }}
                  minDate={new Date()}
                />
                <span className="mx-2">-</span>
                <DatePicker
                  placeholderText={'End Date (Optional)'}
                  className="px-3 py-2 w-full rounded-lg focus:!ring-green-500  border-0 placeholder:text-[#A6A5A5] placeholder:font-light text-sm	"
                  selected={endDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="yyyy:MM:dd HH:mm:ss"
                  minDate={form.getFieldProps('date').value[0] || new Date()}
                  onChange={(date: any) => {
                    setEndDate(date);
                    console.log(83, form.getFieldProps('date').value);
                    form.setFieldValue(name, [field.value[0], new Date(date).getTime()]);
                  }}
                />
                <div className="relative ml-2">
                  <QuestionMarkCircleIcon
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseOut}
                    className="w-[16px] h-[16px] shrink-0 cursor-pointer"
                  />
                  <Transition
                    show={showTooltip}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <div className="absolute z-[100] whitespace-nowrap bg-neutral-50 rounded-md text-xs font-normal text-[#454545] p-2 left-1/2 -translate-x-1/2 -top-[50px]	">
                      This will be a long term quest if end date is not selected.
                      {/* triangle */}
                      <span className=""></span>
                    </div>
                  </Transition>
                </div>
              </div>
            );
          }}
        </Field>
      </div>
    </div>
  );
};

export default FormDatePickerItem;
