/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Drawer } from 'antd';
import { getAddress } from 'ethers/lib/utils';
import MarkdownIt from 'markdown-it';
import Table from '@/components/quest/quest-table';
import PrimaryButton from '@/components/common/button/primary-button';
import SingleArrowDownIcon from '@/icons/SingleArrowDownIcon';
import SingleArrowUpIcon from '@/icons/SingleArrowUpIcon';
import CloseIcon from '@/icons/CloseIcon';
import Avatar from '@/components/common/avatar';
import Name from '@/components/common/name';
import EditSubmit from '@/components/quest/edit-submit';
import AcceptModal from '@/components/quest/accept';
import SubmitResult from '@/components/quest/submit-result';
import { formatTask, formatTakerList, formatSbtImg } from '@/utils/pobFormat';

import { useWalletProvider } from '@/components/web3modal';

import POB from '@m7eio/pob-js-sdk';
import { notification } from '@/components/common/notification/index';
import { CONTRACT_ERROR } from '@/common/const';

import sleep from '@/utils/sleep';

type MDrawerProps = {
  createBySelf: boolean;
  pob: POB;
  walletAddress: string | undefined;
  currentWorkflow: any;
  currentWorkflowIndex: number;
  workflowLength: number;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
  onClose: () => void;
  visible: boolean;
};

function empty() {
  // empty
}

export default function MDrawer({
  createBySelf,
  pob,
  currentWorkflow,
  currentWorkflowIndex,
  workflowLength,
  onNext,
  onPrev,
  onClose,
  visible,
}: MDrawerProps) {
  const [rejectLoading, setRejectLoading] = useState<boolean>(false);
  const [currentWorkflowEnded, setCurrentWorkflowEnded] = useState(false);
  const { connect, data } = useWalletProvider();
  const { address: walletAddress } = data || {};

  const columns = (takerCount: number, currentWorkflowEnded = false) => [
    {
      title: (
        <>
          Quest Taker
          <span className="ml-2 inline-block rounded-md border p-1.5 text-sm">{takerCount}</span>
        </>
      ),
      key: 'quest_taker',
      render: (record: any) => (
        <div className="flex items-center">
          <Avatar diameter={28} link address={record} />
          <Name
            link
            address={record}
            className="ml-3 font-semibold text-neutral-800 no-underline hover:text-neutral-800"
          />
        </div>
      ),
    },
    {
      title: 'Submission Date',
      key: 'submission_date',
      render: (record: any) => (
        <div className="text-left text-sm font-normal text-[#757575]">{record}</div>
      ),
    },
    {
      title: 'Reward Allocation',
      key: 'reward_allocation',
      render: (record: any) => (
        <div className="flex justify-start">
          {record && (
            <span className="rounded-[4px] bg-[#FFFBF2] px-3 py-1 font-normal">{`${record} ${currentWorkflow.reward.unit}`}</span>
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      className: 'font-normal text-sm text-neutral-800 text-left',
      render: (record: any) => (
        <div className="flex justify-start">
          {record === 'approved' && <span className="success-status-tag">VERIFIED</span>}
          {record === 'submitted' && <span className="info-status-tag">PENDING REVIEW</span>}
          {record === 'applied' && <span className="warn-status-tag">UNSUBMITTED</span>}
          {record === 'rejected' && <span className="fail-status-tag">DECLINED</span>}
        </div>
      ),
    },
    {
      title: '',
      key: 'expand',
      render: (onExpand: any, isExpand: boolean, record: any) => (
        <div className="flex justify-end">
          {(createBySelf ||
            getAddress(currentWorkflow.reviewer) === walletAddress ||
            getAddress(record.taker) === walletAddress) &&
            record.status !== 'applied' && (
              <PrimaryButton
                onClick={() => onExpand()}
                text="View"
                icon={
                  isExpand ? (
                    <SingleArrowUpIcon className="ml-2" color="white" />
                  ) : (
                    <SingleArrowDownIcon className="ml-2" color="white" />
                  )
                }
              />
            )}
        </div>
      ),
      desRender: (record: any) => {
        console.log(127, currentWorkflowEnded);

        const result = record?.content && mdParser.render(record.content);
        return (
          <div className="flex">
            <div className="mr-[120px] flex-1 overflow-auto py-2 text-sm">
              {<div className="ql-editor" dangerouslySetInnerHTML={{ __html: result }}></div>}
            </div>
            {getAddress(currentWorkflow.reviewer) === getAddress(walletAddress as string) &&
              record.status === 'submitted' && (
                <div className="flex w-[176px] items-center">
                  <PrimaryButton
                    text="Accept"
                    disabled={currentWorkflowEnded}
                    loadingText="Accept"
                    onClick={() => onApprove(record.taker)}
                    className={`mr-4 flex items-center rounded-full py-[6px] px-4 text-sm shadow outline-0 ${
                      currentWorkflowEnded ? '!bg-black/50' : ''
                    }`}
                  />
                  <PrimaryButton
                    text="Decline"
                    disabled={currentWorkflowEnded}
                    loadingText="Decline"
                    loading={rejectLoading}
                    onClick={() => {
                      console.log(rejectLoading, currentWorkflowEnded);
                      onReject(record.taker);
                      return;
                    }}
                    className={`!hover:bg-[#FFFDF68C]/60 !bg-[#FFFDF68C] !text-[#121212]/60 shadow outline-0`}
                  />
                </div>
              )}

            {getAddress(currentWorkflow.reviewer) !== getAddress(walletAddress as string) &&
              ['submitted', 'rejected', 'approved'].indexOf(record.status) > -1 && (
                <div className="flex w-[90px] items-center">
                  <button
                    onClick={() => handViewResult(record)}
                    className="mr-4 flex items-center rounded-full py-[6px] px-4 text-sm shadow outline-0"
                  >
                    View
                  </button>
                </div>
              )}
            {getAddress(currentWorkflow.reviewer) === getAddress(walletAddress as string) &&
              record.status === 'rejected' && (
                <div className="flex w-[90px] items-center">
                  <button
                    onClick={() => handViewResult(record)}
                    className="mr-4 flex items-center rounded-full py-[6px] px-4 text-sm shadow outline-0"
                  >
                    View
                  </button>
                </div>
              )}
          </div>
        );
      },
    },
  ];

  const [currentUserStatus, setCurrentUserStatus] = useState('claim');
  const [takerDate, setTakerDate] = useState<any>({ dataSource: [], columns: columns(0) });
  const [cacheTakerList, setCacheTakerList] = useState<any[]>([]);
  const [editSubmitShow, setEditSubmitShow] = useState(false);
  const [acceptShow, setAcceptShow] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [acceptData, setAcceptData] = useState<any>();
  const [submitResultShow, setSubmitResultShow] = useState(false);
  const [submitResultData, setSubmitResultData] = useState<any>();
  const [totalRewards, setTotalRewards] = useState<any>(null);
  const [remainingRewards, setRemainingRewards] = useState<any>(null);
  const [sbtImg, setSbtImg] = useState<any>(null);
  const [claimLoading, setClaimLoading] = useState(false);
  const [closeLoading, setCloseLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [claimSBTLoading, setClaimSBTLoading] = useState(false);
  const [takerListLoading, setTakerListLoading] = useState(false);

  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  const onCloseQuest = async () => {
    setCloseLoading(true);
    try {
      const res = await pob.workflow.close(currentWorkflow.workflow);
      await res.wait();
      await sleep(3000);
      onClose();
      setCloseLoading(false);
    } catch (error) {
      setCloseLoading(false);
      notification.error('close quest fail');
      throw {
        code: 'closeWorkflowError',
        message: error,
      };
    }
  };

  const onReject = async (tacker: string) => {
    setRejectLoading(true);
    try {
      const taskStatus = await pob.task.getTakerTaskStatus(currentWorkflow.workflow, 0, tacker);
      const rejectData = await pob.task.reject(currentWorkflow.workflow, 0, tacker);
      console.log('rejectData', rejectData);
      updateStatus();
      notification.success('decline success');
    } catch (error: any) {
      setRejectLoading(false);
      notification.error(error.msg);
      // throw new Error(error);
    }
    setRejectLoading(false);
  };

  const onApprove = async (tacker: string) => {
    const data = await pob.task.getTask(currentWorkflow.workflow, 0);
    const { totalRewards, remainingRewards, onlyOneWinner } = data.data;
    setAcceptData({
      toAddress: tacker,
      totalRewards,
      remainingRewards,
      onlyOneWinner,
    });
    setAcceptShow(true);
    // await pob.workflow.approve(currentWorkflow.workflow, [tacker]);
  };

  const handleConfirmAccept = async (value?: ethers.BigNumber) => {
    if (acceptData.toAddress) {
      setAcceptLoading(true);
      try {
        const tx = await pob.task.approve(
          currentWorkflow.workflow,
          0,
          acceptData.toAddress,
          {},
          value,
        );
        tx.wait();
        updateStatus();
      } catch (error: any) {
        setAcceptShow(false);
        setAcceptLoading(false);
        throw new Error(error);
      }
      setAcceptLoading(false);
      setAcceptShow(false);
    }
  };

  const onClaim = async () => {
    const now = Date.now();
    const startDate = new Date(currentWorkflow.date_range.startTimeString).getTime();

    if (now < startDate) {
      notification.warn('not start');
      return;
    }
    if (walletAddress) {
      try {
        setClaimLoading(true);
        const res = await pob.workflow.apply(currentWorkflow.workflow);
        await res.wait();
        await sleep(3000);
        await Promise.all([
          getWorkflowStatus(currentWorkflow.workflow, walletAddress),
          getWorkflowTakerList(currentWorkflow.workflow),
        ]);
        setClaimLoading(false);
      } catch (error: any) {
        setClaimLoading(false);
        notification.error(
          CONTRACT_ERROR[error.reason] || error.reason || error.message || 'claim quest fail',
        );
        throw {
          code: 'claimWorkflowError',
          message: error,
        };
      }
    } else {
      connect();
    }
  };
  const updateStatus = async () => {
    if (!walletAddress) return;
    await sleep(3000);
    getWorkflowStatus(currentWorkflow.workflow, walletAddress);
    getWorkflowTakerList(currentWorkflow.workflow);
  };
  const onSubmit = async (content: string) => {
    if (walletAddress) {
      try {
        setSubmitLoading(true);
        const res = await pob.task.submit(currentWorkflow.workflow, 0, { content });
        await res.wait();
        sleep(3000);
        updateStatus();
      } catch (error: any) {
        setSubmitLoading(false);
        notification.error(CONTRACT_ERROR[error.reason] || error.reason || error.message);
        console.error(error);
        return;
      }
      setSubmitLoading(false);
      setEditSubmitShow(false);
    } else {
      connect();
    }
  };

  const onClaimSBT = async () => {
    try {
      setClaimSBTLoading(true);
      const claimSBTData = await pob.sbt.claim(currentWorkflow.workflow);
      updateStatus();
    } catch (error: any) {
      setClaimSBTLoading(false);
      throw new Error(error);
    }
    setClaimSBTLoading(false);
  };

  const handViewResult = (record: any) => {
    setSubmitResultShow(true);
    setSubmitResultData(record);
  };

  const getSBTInfo = async (sbtAddress: string) => {
    const sbtInfo = await pob.sbt.getInfo(sbtAddress);
    setSbtImg({
      url: formatSbtImg(sbtInfo.data.metadata.image),
      name: sbtInfo.data.name,
      symbol: sbtInfo.data.symbol,
    });
  };

  const getTasks = async (workflow: string) => {
    const allTasks = await pob.task.getTasks(workflow);
    if (allTasks?.status === 'success' && Array.isArray(allTasks?.data?.docs)) {
      const { totalRewardsValue, remainingRewardsValue } = formatTask(allTasks.data.docs[0]);
      setTotalRewards(totalRewardsValue);
      setRemainingRewards(remainingRewardsValue);
    }
  };

  const getWorkflowStatus = async (workflow: string, taker: string) => {
    const workFlowStatus = await pob.workflow.getTakerStatus(workflow, taker);

    if (workFlowStatus.status === 'success') {
      if (workFlowStatus.data.status === 'applied' || workFlowStatus.data.status === 'approved') {
        const taskStatus = await pob.task.getTakerTaskStatus(workflow, 0, taker);

        if (taskStatus.status === 'success') {
          setCurrentUserStatus(taskStatus.data.status);
          if (workFlowStatus.data?.sbt) {
            setCurrentUserStatus('rewardclaimed');
          }
        } else {
          setCurrentUserStatus(workFlowStatus.data.status);
          if (workFlowStatus.data?.sbt) {
            setCurrentUserStatus('rewardclaimed');
          }
        }
      } else {
        setCurrentUserStatus(workFlowStatus.data.status);
      }
    } else {
      setCurrentUserStatus('claim');
    }

    const workflowData = await pob.workflow.getWorkflow(workflow);
    console.log(443, workflowData);

    if (workflowData.data.workflowEnded || _isPassed(workflowData.data.endTime)) {
      setCurrentWorkflowEnded(true);
    } else {
      setCurrentWorkflowEnded(false);
    }
  };

  const getWorkflowTakerList = async (workflow: string) => {
    setTakerListLoading(true);
    try {
      const takerList = await pob.workflow.getTakersWithStatus(workflow);
      if (takerList.status === 'success' && takerList?.data?.docs?.length > 0) {
        const dataSource = await formatTakerList(takerList.data.docs, pob);
        const workflowData = await pob.workflow.getWorkflow(workflow);

        setCacheTakerList(takerList.data.docs);
        setTakerDate({
          dataSource,
          columns: columns(takerList.data.docs.length, workflowData.data.workflowEnded),
        });
        if (workflowData.data.workflowEnded || _isPassed(workflowData.data.endTime)) {
          setCurrentWorkflowEnded(true);
        } else {
          setCurrentWorkflowEnded(false);
        }
      }
      setTakerListLoading(false);
    } catch (error) {
      const columns = takerDate?.columns;
      setTakerDate({ dataSource: [], columns });
      setCacheTakerList([]);
      setTakerListLoading(false);
      notification.error('fetch taker list fail');
      throw {
        code: 'getTakerListError',
        message: error,
      };
    }
  };

  useEffect(() => {
    if (pob) {
      getTasks(currentWorkflow.workflow);
      getSBTInfo(currentWorkflow.sbtAddress);
      getWorkflowTakerList(currentWorkflow.workflow);
      if (walletAddress) {
        getWorkflowStatus(currentWorkflow.workflow, walletAddress);
      }
    }
  }, [pob, currentWorkflow]);

  useEffect(() => {
    setTakerDate({
      ...takerDate,
      columns: columns(cacheTakerList.length),
    });
  }, [rejectLoading]);
  const questProgress = (status: string) => {
    switch (status) {
      case 'claim':
        return (
          <PrimaryButton
            loading={claimLoading}
            className={`${currentWorkflowEnded ? '!bg-black/50' : ''}`}
            disabled={currentWorkflowEnded}
            text="Claim"
            onClick={onClaim}
          />
        );
      case 'applied':
        return (
          <PrimaryButton
            text="Submit"
            disabled={currentWorkflowEnded}
            className={`${currentWorkflowEnded ? '!bg-black/50' : ''}`}
            onClick={() => setEditSubmitShow(true)}
          />
        );
      case 'submitted':
        return (
          <>
            <span className="info-status-tag">PENDING REVIEW</span>
          </>
        );
      case 'approved':
        return (
          <div className="flex justify-end">
            <span className="success-status-tag mr-2">VERIFIED</span>
            <PrimaryButton loading={claimSBTLoading} text="Claim SBT" onClick={onClaimSBT} />
          </div>
        );
      case 'rejected':
        return (
          <div className="flex justify-end">
            <span className="fail-status-tag mr-2">DECLINED</span>
            <PrimaryButton
              text="Resubmit"
              disabled={currentWorkflowEnded}
              className={`${currentWorkflowEnded ? '!bg-black/50' : ''}`}
              onClick={() => setEditSubmitShow(true)}
            />
          </div>
        );
      case 'rewardclaimed':
        return (
          <>
            <span className="info-status-tag mr-2">REWARD CLAIMED</span>
          </>
        );
      default:
        break;
    }
  };

  const title = () => (
    <div className="item-center relative flex justify-between">
      <div>
        <span className="mr-4 text-xl font-semibold text-neutral-800">{currentWorkflow.quest}</span>
        <span className="mr-1 rounded-[4px] bg-[#FFFBF2] px-3 py-1">SBT</span>
        <span className="mr-1 rounded-[4px] bg-[#FFFBF2] px-3 py-1">
          <span className="text-sm text-[#8F8F8F]">{`${totalRewards} ${currentWorkflow.reward.unit} TOTAL`}</span>
          <span className="ext-sm">
            {`· ${remainingRewards} ${currentWorkflow.reward.unit} REMAINING(5% commission has been deducted)`}
          </span>
        </span>
      </div>
      {currentWorkflow.issuer === walletAddress?.toLocaleLowerCase() ? (
        <PrimaryButton
          disabled={currentWorkflowEnded}
          className={`${currentWorkflowEnded ? '!bg-black/50' : ''}`}
          loading={closeLoading}
          text="Close Quest"
          onClick={onCloseQuest}
        />
      ) : (
        questProgress(currentUserStatus)
      )}
      {visible && (
        <div className="fixed right-[80%] mr-6 flex flex-col space-y-3">
          <div
            className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-full bg-[#FFFBF2]"
            onClick={onClose}
          >
            <CloseIcon color="#E4E1DC" size={10} />
          </div>
          {currentWorkflowIndex > 0 && (
            <div
              className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-full bg-[#FFFBF2]"
              onClick={onPrev}
            >
              <SingleArrowUpIcon color="#E4E1DC" />
            </div>
          )}
          {currentWorkflowIndex < workflowLength - 1 && (
            <div
              className="flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-full bg-[#FFFBF2]"
              onClick={onNext}
            >
              <SingleArrowDownIcon color="#E4E1DC" />
            </div>
          )}
        </div>
      )}
    </div>
  );

  const _isPassed = (deadline: number) => {
    if (!deadline) return false;
    const now = Date.now();
    return now > deadline;
  };
  return (
    <div className="w-full">
      <Drawer
        headerStyle={{ background: '#f3f0e9', borderBottom: '2px solid #E9E7E7' }}
        bodyStyle={{ background: '#f3f0e9' }}
        title={title()}
        placement="right"
        width="80%"
        onClose={onClose}
        visible={visible}
        closable={false}
        maskClosable={false}
      >
        <div className="flex flex-col">
          <div className="my-10 flex justify-between">
            <div className="mr-[109px] flex w-full flex-col">
              <div className="mb-6 flex space-x-6">
                <div>
                  <span className="mr-1 font-light text-[#7B7B7B]">Created by</span>
                  <span className="font-medium text-neutral-800">
                    <Name address={currentWorkflow.quest_issuer.issuer} />
                  </span>
                </div>
                <div>
                  <span className="mr-1 font-light text-[#7B7B7B]">Skill</span>
                  <span className="font-medium text-neutral-800">
                    {currentWorkflow.tags.join(' ')}
                  </span>
                </div>
                <div>
                  <span className="mr-1 font-light text-[#7B7B7B]">Date</span>
                  <span className="font-medium text-neutral-800">
                    {currentWorkflow.date_range.endTimeString
                      ? `${currentWorkflow.date_range.startTimeString} - ${currentWorkflow.date_range.endTimeString}`
                      : currentWorkflow.date_range.startTimeString}
                  </span>
                </div>
              </div>
              <div className="taext-sm font-light text-[#7B7B7B]">
                {currentWorkflow.description}
              </div>
              {/* <div className="mt-3 flex items-center text-[#2B2B2B]">
                See More <SingleArrowDownIcon className="ml-1" />
              </div> */}
            </div>
            <div className="relative h-auto w-[280px] flex-shrink-0 overflow-hidden rounded-[20px] bg-[#F7F5EF]">
              <div className="absolute bottom-3 left-2.5 flex h-[55px] w-[260px] divide-x rounded-xl bg-[#ebeefa33] px-4 py-2 backdrop-opacity-90">
                <div className="flex w-1/2 flex-col items-center">
                  <span className="text-xs">Name</span>
                  <span className="max-w-[90%] truncate text-sm font-medium">{sbtImg?.name}</span>
                </div>
                <div className="flex w-1/2 flex-col items-center">
                  <span className="text-xs">Symbol</span>
                  <span className="max-w-[90%] truncate text-sm font-medium">{sbtImg?.symbol}</span>
                </div>
              </div>
              <img className="h-[280px] w-[280px] rounded-[20px]" alt="" src={sbtImg?.url} />
            </div>
          </div>
          {!takerListLoading && (
            <Table
              expandable={true}
              dataSource={takerDate.dataSource}
              columns={takerDate.columns}
            />
          )}
          {takerListLoading && (
            <>
              {Array(5)
                .fill(0)
                .map((e, index) => (
                  <div className="mt-2 flex items-center" key={index}>
                    <div className="h-16 w-full animate-pulse bg-gray-200"></div>
                  </div>
                ))}
            </>
          )}
        </div>
      </Drawer>

      <SubmitResult
        data={submitResultData}
        visible={submitResultShow}
        onClose={() => setSubmitResultShow(false)}
      />
      <AcceptModal
        successCallback={handleConfirmAccept}
        visible={acceptShow}
        data={acceptData}
        loading={acceptLoading}
        unit={currentWorkflow.reward.unit}
        onClose={() => {
          setAcceptShow(false);
        }}
      />
      <EditSubmit
        onSubmit={onSubmit}
        loading={submitLoading}
        visible={editSubmitShow}
        onClose={empty}
        onIconClose={() => setEditSubmitShow(false)}
      />
    </div>
  );
}