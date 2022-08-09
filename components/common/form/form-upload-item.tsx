/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import { ErrorMessage, Field, FieldProps } from 'formik';
import { UploadIcon, RefreshIcon, XCircleIcon } from '@heroicons/react/outline';
import Upload from 'rc-upload';
import { notification } from '@/components/common/notification/index';
import {
  CREATE_QUEST_IMAGES_COMMUNITY,
  CREATE_QUEST_IMAGES_MARKETING,
  CREATE_QUEST_IMAGES_OTHERS,
  CREATE_QUEST_IMAGES_DESIGN,
  CREATE_QUEST_IMAGES_DEV,
} from '@/common/const';
import useStyle from './upload-style';

interface FormRadioItemProps {
  label?: string;
  labelClassName?: string;
  name: string;
  placeholder?: string;
  inputRef?: any;
  className?: string;
  curSelectSkill: number;
}

const FormRadioItem: FC<FormRadioItemProps> = ({
  label,
  labelClassName,
  name,
  placeholder,
  inputRef,
  className,
  curSelectSkill = 0,
  ...props
}) => {
  const [selectImage, setSelectImage] = useState<any>(null);
  const [currentKey, setCurrentKey] = useState('');
  const [currentShowImage, setCurrentShowImage] = useState<any | null>(null);
  const [uploadError, setUploadError] = useState(false);
  const [authorization, setAuthorization] = React.useState<string>('');
  const [percent, setPercent] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const username = 'e7c467ee-426e-42fd-ae54-c574b5515068';
  const password = 's1O5gddRKVNXlx5W1l0kjy7XWIkD1zzlf6uRAwxu';
  useEffect(() => {
    const auth = window.btoa(`${username}:${password}`);
    setAuthorization(`Basic ${auth}`);
  }, []);
  const dropProps = {
    type: 'drag',
    action: `https://api.particle.network/ipfs/upload`,
    accept: '.png, .jpg, .jpeg, .gif',
    beforeUpload: (file: any) => {
      if (file.size / 1024 / 1024 > 10) {
        notification.error('The uploaded image size cannot exceed 10BM');
        return false;
      }
      return file;
    },
    onStart: () => {
      setLoading(true);
      setCurrentKey('');
      setCurrentShowImage(null);
      setUploadError(false);
      setPercent(0);
      // if (images.length >= 5) {
      //   notification.error('Upload a maximum of 5 images');
      //   return;
      // }
    },
    // onSuccess(data: Record<string, any>) {
    // console.log(59, data);
    // setImages([data.data, ...images]);
    // setPercent(null);
    // setCurrentKey(data.data.key);
    // setCurrentShowImage(data.data);
    // },
    onProgress(step: any) {
      setPercent(step.percent);
    },
    onError() {
      setUploadError(true);
      setPercent(null);
    },
    className: 'outline-none',
  };
  const classes = useStyle();
  // const dropProps = { ...props, type: 'drag' };

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
      <div className="relative">
        <ErrorMessage
          name={name}
          component="div"
          className="absolute left-1 -bottom-6 select-none text-sm font-medium uppercase tracking-wider text-neutral-400"
        />
        <Field name={name}>
          {({ field, form, meta }: FieldProps) => {
            return (
              <div className="flex-horizontal justify-start space-x-4">
                {loading ? (
                  <div className="relative flex h-[200px] w-[200px] items-center justify-center border-[#D7D5D5] bg-[#FFFBF2]">
                    <RefreshIcon className="h-5 w-5 animate-spin" />
                  </div>
                ) : selectImage?.url || selectImage?.publicUrl ? (
                  <div
                    className={`${classes.uploadContent} relative flex h-[200px] w-[200px] items-center justify-center border-[#D7D5D5] bg-[#FFFBF2]`}
                  >
                    <img className="h-full p-2" src={selectImage?.url || selectImage?.publicUrl} />
                    <XCircleIcon
                      onClick={() => {
                        setSelectImage('');
                        form.setFieldValue(name, '');
                      }}
                      className="close-button absolute -right-2 -top-2 h-5 w-5 cursor-pointer text-[#999]"
                    />
                  </div>
                ) : (
                  <Upload
                    {...dropProps}
                    headers={{ Authorization: authorization }}
                    onSuccess={(data: any) => {
                      setSelectImage(data);
                      form.setFieldValue(name, data?.cid);
                      setLoading(false);
                    }}
                  >
                    <div
                      className={`relative flex h-[200px] w-[200px] items-center justify-center rounded-lg border-[#D7D5D5]  bg-[#FFFBF2]
                      ${meta.touched && meta.error ? 'border !border-red-500' : ''}
                    `}
                    >
                      <UploadIcon className="h-[22px] w-[22px]" />
                    </div>
                  </Upload>
                )}
                <div className="grid h-[200px] w-[200px] grid-cols-2 grid-rows-2 place-content-center rounded-md border border-dashed border-[#D7D5D5] bg-[#FFFBF2]">
                  {[
                    CREATE_QUEST_IMAGES_COMMUNITY,
                    CREATE_QUEST_IMAGES_MARKETING,
                    CREATE_QUEST_IMAGES_OTHERS,
                    CREATE_QUEST_IMAGES_DESIGN,
                    CREATE_QUEST_IMAGES_DEV,
                  ][curSelectSkill].map((item, k) => {
                    return (
                      <img
                        onClick={() => {
                          setSelectImage(item);
                          form.setFieldValue(name, item.hashV0);
                        }}
                        key={item.key}
                        className="w-[100px] cursor-pointer p-2"
                        src={item.publicUrl}
                      />
                    );
                  })}
                </div>
              </div>
            );
          }}
        </Field>
      </div>
    </div>
  );
};

export default FormRadioItem;
