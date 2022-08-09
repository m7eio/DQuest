import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { utils } from '@m7eio/pob-js-sdk';
import { ethers } from 'ethers';

import PrimaryButton from '@/components/common/button/primary-button';
import Name from '@/components/common/name';

const { formatBalance, parseBalance } = utils;

type editSubmitProps = {
  visible: boolean;
  onClose: () => void;
  // data: {
  //   toAddress: string;
  //   totalRewards: {
  //     value: string;
  //     decimals: number;
  //   };
  //   remainingRewards: {
  //     value: string;
  //     decimals: number;
  //   };
  //   onlyOneWinner: boolean;
  // }
  // onlyOneMode
  loading: boolean;
  unit: string;
  data: any;
  successCallback: (value?: ethers.BigNumber) => void;
};

function EditSubmit({ visible, onClose, data, unit, loading, successCallback }: editSubmitProps) {
  const [rewardValue, setRewardValue] = useState<string>();
  const [rewardIsExceed, setRewardIsExceed] = useState<boolean>(false);
  const formatedRewardValue =
    (data?.remainingRewards?.value &&
      formatBalance(data?.remainingRewards?.value, data?.remainingRewards?.decimals)) ||
    0;
  const handleSetMaxReward = () => {
    setRewardValue(formatedRewardValue);
  };
  const handleChangeMultiRewardValue = (e: any) => {
    const { value } = e.target;
    console.log(43, /^\d*\.?\d+$/.test(value));

    if (!/^\d*\.?\d+$/.test(value)) return;
    setRewardValue(value);
    if (value > +formatedRewardValue) {
      setRewardIsExceed(true);
    } else {
      setRewardIsExceed(false);
    }
  };
  const handleConfirm = () => {
    if (data?.onlyOneWinner) {
      successCallback();
    } else {
      const parsedValue = parseBalance(`${rewardValue}`, data?.remainingRewards?.decimals);
      successCallback(parsedValue);
    }
  };
  return (
    <Transition
      show={visible}
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Dialog
        as="div"
        onClose={onClose}
        className="fixed inset-0 z-[2000] flex items-center justify-center overflow-y-auto"
      >
        <Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-lg" />

        <div className="flex-vertical relative z-[2000] mb-12 w-[700px] rounded-3xl bg-[#f3f0e9] px-16 pt-32 pb-14">
          {/* // 多人 */}
          {!data?.onlyOneWinner && (
            <p className="flex-horizontal mb-6 text-xl text-xl font-semibold">
              Sending
              <input
                value={rewardValue}
                onChange={handleChangeMultiRewardValue}
                placeholder={`${formatedRewardValue} REMAINING `}
                className={`ml-3 bg-[#F3F0E9] pl-3 pt-1 text-[#2b2b2b] outline-none placeholder:text-[#CFCFCF] ${rewardIsExceed} ? 'focus:ring focus:border-red-500'`}
              />
              <span onClick={handleSetMaxReward} className="mx-3 cursor-pointer text-sm font-light">
                MAX
              </span>{' '}
              {unit}
              <span className="ml-2">to</span>
              <Name
                link
                address={data?.toAddress}
                className="ml-3 !text-xl !font-semibold text-neutral-800 no-underline hover:text-neutral-800"
              />{' '}
              ?
            </p>
          )}

          {/* 单人 */}
          {data?.onlyOneWinner && (
            <p className="flex-horizontal mb-16 text-xl font-semibold">
              Sending {formatedRewardValue} {unit} to
              <Name
                link
                address={data?.toAddress}
                className="ml-3 !text-xl !font-semibold text-neutral-800 no-underline hover:text-neutral-800"
              />
              ?
            </p>
          )}
          <PrimaryButton
            loading={loading}
            loadingText="Submit"
            text="Submit"
            onClick={handleConfirm}
          />
          <span className="flex-horizontal mt-4 text-sm font-normal text-[#A6A5A5]">
            THIS ACTION CANNOT BE UNDONE.
          </span>
        </div>
      </Dialog>
    </Transition>
  );
}

export default EditSubmit;
