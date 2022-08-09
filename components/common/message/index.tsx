import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';

/**
 * icon
 *
 * 1: CheckCircleIcon  ✅
 * 2: ExclamationCircleIcon  ❗️
 * 3: XCircleIcon  ❌
 * 4: QuestionMarkCircleIcon  ❓
 * 5: InformationCircleIcon  ℹ️
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Message(props: any) {
  const { show, onCancel, modalMessageInfo } = props;

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {modalMessageInfo.icon === 1 ? (
                    <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                  ) : modalMessageInfo.icon === 2 ? (
                    <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
                  ) : modalMessageInfo.icon === 3 ? (
                    <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                  ) : modalMessageInfo.icon === 4 ? (
                    <QuestionMarkCircleIcon
                      className="h-6 w-6 text-yellow-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <InformationCircleIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">
                    {modalMessageInfo.messageText}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onCancel}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
