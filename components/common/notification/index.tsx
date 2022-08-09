/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  XCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SuccessIcon from '../../../icons/SuccessIcon';

export function notification(message: string, ...props: any) {
  return toast(message, props);
}

export function NotificationContainer(...props: any) {
  return (
    <ToastContainer
      {...props}
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      bodyClassName="text-neutral-500 text-sm h-5 tracking-wider uppercase my-4"
    />
  );
}

notification.info = (message: string, ...props: any) =>
  toast.info(message, {
    ...props,
    icon: <InformationCircleIcon className="w-4 h-4" />,
    progressClassName: 'bg-blue-500',
  });
notification.success = (message: string, ...props: any) =>
  toast.success(message, { ...props, icon: <SuccessIcon />, progressClassName: 'bg-green-500' });
notification.warn = (message: string, ...props: any) =>
  toast.warn(message, {
    ...props,
    icon: <ExclamationCircleIcon className="w-4 h-4" />,
    progressClassName: 'bg-yellow-500',
  });
notification.error = (message: string, ...props: any) =>
  toast.error(message, {
    ...props,
    icon: <XCircleIcon className="w-4 h-4" />,
    progressClassName: 'bg-red-500',
  });
