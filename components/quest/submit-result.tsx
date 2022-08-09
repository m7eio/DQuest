import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import MarkdownIt from 'markdown-it';

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

type editSubmitProps = {
  visible: boolean;
  onClose: () => void;
  data?: any;
};

function SubmitResult({ visible, onClose, data }: editSubmitProps) {
  if (!data?.content) return <></>;
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
        className="fixed z-[2000] inset-0 overflow-y-auto flex items-center justify-center"
      >
        <Dialog.Overlay className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-lg" />
        <div className="relative z-[2001] w-[750px] bg-[#f3f0e9] rounded-3xl mb-12 pb-14 pt-8 px-16">
          <div className="flex-horizontal justify-start mb-6">
            <h2 className="text-xl font-semibold mr-4">Your Submission</h2>
            {/* 三种状态 */}
            {/* {record === 'approved' }
            {record === 'submitted' }
            {record === 'applied' }
            {record === 'declined'} */}
            {/* 成功 */}
            {data.status === 'approved' && (
              <div className="flex-horizontal justify-between">
                <div className="flex-horizontal text-[#AAC23E] font-medium bg-[#C2DA5829] rounded-md px-3 py-2 h-[28px] text-sm">
                  VERIFIED
                </div>

                <div className="flex-horizontal bg-[#FFFBF2] rounded-md text-sm font-medium h-[28px] px-3">
                  300 DAI
                  <span className="text-[#757575]">REWARDED</span>
                </div>

                <div className="flex-horizontal bg-[#FFFBF2] rounded-md text-sm font-medium h-[28px] px-3">
                  SBT
                  <span className="text-[#757575]">REWARDED</span>
                </div>
              </div>
            )}

            {/* 拒绝 */}
            {data.status === 'rejected' && (
              <div className="flex-horizontal text-[#D8543C] font-medium bg-[#FEE9E499] rounded-md px-3 py-2 h-[28px] text-sm">
                DECLINED
              </div>
            )}

            {/* pending */}
            {data.status === 'submitted' && (
              <div className="flex-horizontal text-[#757575] font-medium bg-[#E9E7E799] rounded-md px-3 py-2 h-[28px] text-sm">
                PENDING REVIEW
              </div>
            )}
          </div>

          <div className="ql-snow">
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: mdParser.render(data.content) }}
            ></div>
          </div>

          <div className="flex-horizontal mt-8">
            <button
              onClick={onClose}
              className="bg-[#000] hover:bg-black-300 text-white rounded-full px-6 py-2"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SubmitResult;
