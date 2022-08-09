import React, { FC, Fragment } from 'react';
import { Transition, Popover } from '@headlessui/react';
import {
  ChevronDownIcon,
  CheckIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from '@heroicons/react/solid';

type projectFilterProps = {
  disabled: boolean;
  sortField: string;
  orderField: string;
  updateSortField: (data: string) => void;
  updateOrderField: (data: string) => void;
};

// eslint-disable-next-line no-shadow
export enum sortType {
  CREATE_TIME = 'Creation time',
  DEADLINE_TIME = 'Submission Deadline',
  REWARD = 'Reward',
}

// eslint-disable-next-line no-shadow
export const sortTypes = [sortType.CREATE_TIME, sortType.DEADLINE_TIME];

// eslint-disable-next-line no-shadow
export enum orderType {
  ASC = 'Ascending',
  DESC = 'Descending',
}

const SortFilter: FC<projectFilterProps> = ({
  disabled,
  sortField,
  orderField,
  updateOrderField,
  updateSortField,
}) => {
  return (
    <div>
      <div className="pl-4">
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
                  <span>Sort by </span>
                  <ChevronDownIcon className={`ml-2 h-5 w-5 text-[#575757]`} aria-hidden="true" />
                </Popover.Button>
                <div
                  onClick={() => {
                    if (disabled) return;
                    updateOrderField(orderField === orderType.ASC ? orderType.DESC : orderType.ASC);
                  }}
                  className="flex-horizontal ml-2 bg-yellow-50 rounded-md  cursor-pointer px-2 py-1 border border-[#E5E5E5]"
                >
                  {orderField === orderType.ASC ? (
                    <SortAscendingIcon
                      className={`h-5 w-5 text-neutral-700 transition duration-150 ease-in-out  ${
                        disabled ? 'text-opacity-50 cursor-not-allowed' : 'hover:text-opacity-80'
                      }`}
                      aria-hidden="true"
                    />
                  ) : (
                    <SortDescendingIcon
                      className={`h-5 w-5 text-neutral-700 transition duration-150 ease-in-out ${
                        disabled ? 'text-opacity-50 cursor-not-allowed' : 'hover:text-opacity-80'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>
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
                <Popover.Panel className="absolute z-10 right-0 mt-3 w-[220px] max-w-sm transform">
                  <div className="overflow-hidden rounded-lg shadow-lg bg-[#F3F0E9] p-4 ">
                    {sortTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => updateSortField(type)}
                        className="flex-horizontal justify-between py-2 px-3 text-neutral-700 font-medium cursor-pointer"
                      >
                        <span>{type}</span>
                        {sortField === type && (
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

export default SortFilter;
