import React, { FC, Fragment } from 'react';
import { Transition, Popover } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/solid';

type projectFilterProps = {
  disabled: boolean;
  statusField: string;
  updateStatusField: (data: string) => void;
};

// eslint-disable-next-line  no-shadow
export enum statusType {
  ACTIVE = 'Active',
  PASSED = 'Passed',
  UPCOMING = 'Upcoming',
}

// eslint-disable-next-line  no-shadow
export const statusTypes = [statusType.ACTIVE, statusType.PASSED, statusType.UPCOMING];

// eslint-disable-next-line no-shadow
export enum orderType {
  ASC = 'Ascending',
  DESC = 'Descending',
}

const StatusFilter: FC<projectFilterProps> = ({ disabled, statusField, updateStatusField }) => {
  return (
    <div>
      <div className="pr-4">
        <Popover className="relative">
          {({ open }: { open: any }) => (
            <>
              {/*  */}
              <div className="flex">
                <Popover.Button
                  className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center rounded-md bg-yellow-50 px-3 py-1.5 text-base font-medium text-[#121212] border border-[#E5E5E5] hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <div>
                    {/* <span className="text-neutral-500">Sort by </span> */}
                    <span>{statusField}</span>
                  </div>
                  <ChevronDownIcon className={`ml-2 h-5 w-5 text-[#575757]`} aria-hidden="true" />
                </Popover.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel className="absolute z-10 left-0 mt-3 w-[160px] max-w-sm transform">
                  <div className="overflow-hidden rounded-lg shadow-lg bg-[#F3F0E9] p-4 ">
                    {statusTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => updateStatusField(type)}
                        className="flex-horizontal justify-between py-2 px-3 text-neutral-700 font-medium cursor-pointer"
                      >
                        <span>{type}</span>
                        {statusField === type && (
                          <CheckIcon
                            className={`ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default StatusFilter;
