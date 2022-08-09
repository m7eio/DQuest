import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Pagination from 'rc-pagination';
import { useRouter } from 'next/router';
import { PlusIcon, CheckCircleIcon } from '@heroicons/react/solid';
import POB from '@m7eio/pob-js-sdk';
import Table from '@/components/quest/quest-table';
import Drawer from '@/components/quest/drawer';
import PrimaryButton from '@/components/common/button/primary-button';
import { useWalletProvider } from '@/components/web3modal';
import { formatWorkflow } from '@/utils/pobFormat';
import Name from '@/components/common/name';
import { notification } from '@/components/common/notification/index';
import { replace } from '@/utils/next-router';
import useNextRouterHook from '@/hooks/useNextRouterHook';
import Filter from '../quest-filter';

// eslint-disable-next-line no-shadow
export enum QuestTypes {
  All = 'all',
  Claimed = 'claimed',
  lssued = 'issued',
}

// eslint-disable-next-line no-shadow
interface questProps {
  type: any;
}

function QuestTab({ type }: questProps) {
  const nextRouter = useRouter();
  const router = useNextRouterHook();

  const colAll = [
    {
      title: 'Quest',
      key: 'quest',
      render: (record: any) => (
        <div className="line-clamp-2 py-auto max-w-[120px] overflow-ellipsis break-words text-left text-sm font-normal text-neutral-800">
          {record}
        </div>
      ),
    },
    {
      title: 'Tag',
      key: 'tags',
      render: (record: any) => (
        <div className="flex flex-col items-start justify-center text-left text-sm font-normal text-neutral-800">
          {record?.map((item: string, idx: number) => {
            return (
              <span
                key={idx}
                className="mt-1 rounded-[4px] border border-[#9CA2F4] px-1 py-[2px] font-light text-[#757575]"
              >
                {item}
              </span>
            );
          })}
        </div>
      ),
    },
    {
      title: 'Deadline',
      key: 'deadline',
      render: (record: any) => (
        <div className="text-left text-sm font-normal text-[#757575]">{record || 'Never'}</div>
      ),
    },
    {
      title: 'Quest Issuer',
      key: 'quest_issuer',
      render: (record: any) => (
        <div className="flex flex-col items-start justify-center text-left text-sm font-normal text-neutral-800">
          {record?.issuer && <Name address={record.issuer} />}
        </div>
      ),
    },
    {
      title: 'Reward',
      key: 'reward',
      render: (record: any) => (
        <div className="flex justify-start text-left text-sm font-normal text-neutral-800">
          <span className="mr-1 rounded-[4px] bg-[#FFFBF2] px-3 py-1">{record.type}</span>
          <span className="mr-1 rounded-[4px] bg-[#FFFBF2] px-3 py-1">{`${record.value} ${record.unit}`}</span>
        </div>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <div className="flex justify-end text-center">
          <PrimaryButton
            text={record.action}
            onClick={() => {
              if (record.action === 'view') {
                replace({
                  pathname: '/quest/all',
                  query: { currentWorkflow: record.currentWorkflow },
                });
              }
            }}
          />
        </div>
      ),
    },
  ];

  const colClaim = [
    {
      title: 'Quest',
      key: 'quest',
      render: (record: any) => (
        <div className="line-clamp-2 py-auto max-w-[120px] overflow-ellipsis break-words text-left text-sm font-normal text-neutral-800">
          {record}
        </div>
      ),
    },
    {
      title: 'Tag',
      key: 'tags',
      render: (record: any) => (
        <div className="flex flex-col items-start justify-center text-left text-sm font-normal text-neutral-800">
          {record?.length > 0 && record[0] && <span>{record[0]}</span>}
          {record?.length > 1 && record[1] && (
            <span className="mt-1 rounded-[4px] border border-[#9CA2F4] px-1 py-[2px] font-light text-[#757575]">
              {record[1]}
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Deadline',
      key: 'deadline',
      render: (record: any) => (
        <div className="text-left text-sm font-normal text-[#757575]">{record}</div>
      ),
    },
    {
      title: 'Quest Issuer',
      key: 'quest_issuer',
      render: (record: any) => (
        <div className="flex flex-col items-start justify-center text-left text-sm font-normal text-neutral-800">
          {record?.issuer && <Name address={record.issuer} />}
          {record?.projectName && (
            <span className="tag-border-gradient mt-1 border px-1 py-[2px] font-light text-[#757575]">
              {record.projectName}
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Reward',
      key: 'reward',
      render: (record: any) => (
        <div className="flex justify-start text-left text-sm font-normal text-neutral-800">
          <span className="mr-1 rounded-[4px] bg-[#FFFBF2] px-3 py-1">{record.type}</span>
          <span className="mr-1 rounded-[4px] bg-[#FFFBF2] px-3 py-1">{`${record.value} ${record.unit}`}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      className: 'font-normal text-sm text-neutral-800 text-left',
      render: (record: any) => (
        <div className="flex justify-start">
          {record === 'approved' && <span className="success-status-tag">Pass</span>}
          {record === 'submitted' && <span className="info-status-tag">Pending review</span>}
          {record === 'applied' && <span className="warn-status-tag">Unsubmitted</span>}
          {record === 'rejected' && <span className="fail-status-tag">Declined</span>}
        </div>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <div className="flex justify-end text-center">
          <PrimaryButton
            text={record.action}
            onClick={() => {
              if (record.action === 'view') {
                replace({
                  pathname: '/quest/claimed',
                  query: { currentWorkflow: record.currentWorkflow },
                });
              }
            }}
          />
        </div>
      ),
    },
  ];

  const colIssued = [
    {
      title: 'Quest',
      key: 'quest',
      render: (record: any) => (
        <div className="line-clamp-2 py-auto max-w-[120px] overflow-ellipsis break-words text-left text-sm font-normal text-neutral-800">
          {record}
        </div>
      ),
    },
    {
      title: 'Tag',
      key: 'tags',
      render: (record: any) => (
        <div className="flex flex-col items-start justify-center text-left text-sm font-normal text-neutral-800">
          {record?.length > 0 && record[0] && <span>{record[0]}</span>}
          {record?.length > 1 && record[1] && (
            <span className="mt-1 rounded-[4px] border border-[#9CA2F4] px-1 py-[2px] font-light text-[#757575]">
              {record[1]}
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Deadline',
      key: 'deadline',
      render: (record: any) => (
        <div className="text-left text-sm font-normal text-[#757575]">{record}</div>
      ),
    },
    {
      title: 'Issuer',
      key: 'quest_issuer',
      render: (record: any) => (
        <div className="flex flex-col items-start justify-center text-left text-sm font-normal text-neutral-800">
          {record?.issuer && <Name address={record.issuer} />}
        </div>
      ),
    },
    {
      title: 'Submitted/Claimed',
      key: 'submitted_claimed',
      render: (record: any) => (
        <div className="flex justify-start">
          <span className="mr-1 rounded-[4px] bg-[#FFFBF2] px-3 py-1">{record.submitted}</span>
          <span className="mr-1 rounded-[4px] bg-[#FFFBF2] px-3 py-1 text-[#AFAFAF]">
            {record.claimed}
          </span>
        </div>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (record: any) => (
        <div className="flex justify-end text-center">
          <PrimaryButton
            text={record.action}
            onClick={() => {
              if (record.action === 'view') {
                replace({
                  pathname: '/quest/issued',
                  query: { currentWorkflow: record.currentWorkflow },
                });
              }
            }}
          />
        </div>
      ),
    },
  ];

  const { currentWorkflow } = router.query;

  const [visibleView, setVisibleView] = useState(false);
  const [tableDate, setTableDate] = useState<any>({
    dataSource: [],
    columns: type === QuestTypes.All ? colAll : type === QuestTypes.Claimed ? colClaim : colIssued,
  });

  console.log('tableDate', tableDate);

  const [currentWorkflowIndex, setCurrentWorkflowIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotalStatus] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pob, setPob] = useState<any>(null);

  const [params, setParams] = useState({
    sort: '',
    filter: '',
  });

  const { data: walletData } = useWalletProvider();
  const { address: walletAddress, ethersProvider: provider } = walletData || {};

  const getWorkflow = async (page: number) => {
    setLoading(true);
    try {
      let quests;
      if (type === QuestTypes.All) {
        quests = await pob.workflow.getWorkflows(page, 10, params.filter, params.sort);
        if (quests.status === 'success') {
          const dataSource = await formatWorkflow(quests.data.docs, QuestTypes, type);
          setTableDate({ dataSource, columns: colAll });
          const { totalDocs } = quests?.data;
          setTotalStatus(totalDocs);
          setLoading(false);
        }
      } else if (type === QuestTypes.Claimed) {
        quests = await pob.workflow.getTakerAppliedWorkflows(
          walletAddress,
          page,
          10,
          params.filter,
          params.sort,
        );
        if (quests.status === 'success') {
          const dataSource = await formatWorkflow(
            quests.data.docs,
            QuestTypes,
            type,
            pob,
            walletAddress,
          );
          setTableDate({ dataSource, columns: colClaim });
          const { totalDocs } = quests?.data;
          setTotalStatus(totalDocs);
          setLoading(false);
        }
      } else if (type === QuestTypes.lssued) {
        quests = await pob.workflow.getIssuerCreatedWorkflows(
          walletAddress,
          page,
          10,
          params.filter,
          params.sort,
        );
        if (quests.status === 'success') {
          const dataSource = await formatWorkflow(quests.data.docs, QuestTypes, type, pob);
          console.log('dataSource', dataSource);
          setTableDate({ dataSource, columns: colIssued });
          const { totalDocs } = quests?.data;
          setTotalStatus(totalDocs);
          setLoading(false);
        }
      }
    } catch (error) {
      const columns = tableDate?.columns;
      setTableDate({ dataSource: [], columns });
      setLoading(false);
      notification.error('fetch quest fail');
      throw error;
    }
    setLoading(false);
  };

  const onClose = () => {
    setVisibleView(false);
    replace({
      pathname: `/quest/${type}`,
    });
  };
  const onChangeIndex = (status: string) => {
    let workflow;
    if (status === 'next') {
      workflow = tableDate.dataSource[currentWorkflowIndex + 1];
    }
    if (status === 'prev') {
      workflow = tableDate.dataSource[currentWorkflowIndex - 1];
    }
    replace({
      pathname: `/quest/${type}`,
      query: { currentWorkflow: workflow.workflow },
    });
  };

  useEffect(() => {
    setPob(new POB(provider));
  }, [provider]);

  useEffect(() => {
    setCurrentPage(1);
  }, [type, params]);

  useEffect(() => {
    if (pob && walletAddress) {
      getWorkflow(currentPage);
    }
  }, [pob, currentPage, type, params, walletAddress]);

  useEffect(() => {
    if (currentWorkflow && !loading && tableDate.dataSource.length > 0) {
      const index = tableDate.dataSource.findIndex(
        (data: any) => data.workflow === currentWorkflow,
      );
      setVisibleView(true);
      setCurrentWorkflowIndex(index);
    }
  }, [currentWorkflow, loading]);

  return (
    <>
      <div className="mb-4 rounded-md bg-[#fffbf2] p-2">
        Supported by{' '}
        <a target="_blank" className="underline" href="http://pob.work">
          POB Protocol
        </a>{' '}
        and currently supports Goerli testnet.
      </div>
      <div className="flex-horizontal mb-12 justify-between">
        <span className="text-[32px] font-bold text-[#121212]">Quest Board</span>
        <a
          href="/quest/create"
          className="font-base flex-horizontal cursor-pointer rounded-full bg-[#121212] py-[10px] px-[24px] font-semibold text-[#fff] hover:text-[#fff]"
        >
          <PlusIcon className="mr-2 h-[14px] w-[14px]" />
          Create Quest
        </a>
      </div>
      <div className="flex-horizontal justify-between">
        <div className="flex-horizontal font-md mb-3 h-[36px] rounded-full bg-[#fffbf2] p-1 font-semibold text-[#000000]">
          <div
            className={classNames(
              type === 'all' ? 'w-22 h-[28px] shrink-0 rounded-full bg-[#F3F0E9]' : '',
              'flex-horizontal w-[106px] cursor-pointer',
            )}
            onClick={() => {
              nextRouter.push(`/quest/all`);
            }}
          >
            All
          </div>
          <span className="mx-3 h-2 w-[1px] bg-[#D7D5D5]"></span>
          <div
            className={classNames(
              type === 'claimed' ? 'w-22 h-[28px] rounded-full bg-[#F3F0E9]' : '',
              'flex-horizontal w-[106px] cursor-pointer',
            )}
            onClick={() => {
              nextRouter.push(`/quest/claimed`);
            }}
          >
            Claimed
          </div>
          <span className="w-22 mx-3 h-2 w-[1px] bg-[#D7D5D5]"></span>
          <div
            className={classNames(
              type === 'issued' ? 'relative h-[28px] w-20 rounded-full bg-[#F3F0E9]' : '',
              'flex-horizontal w-[106px] cursor-pointer',
            )}
            onClick={() => {
              nextRouter.push(`/quest/issued`);
            }}
          >
            Issued
          </div>
        </div>

        <div className="flex-horizontal justify-between space-x-4">
          <span className="flex-horizontal">
            <CheckCircleIcon className="mr-2 h-4 w-4 text-[#757575]	" />
            lnvestment Quest
          </span>
          <span className="flex-horizontal">
            <CheckCircleIcon className="mr-2 h-4 w-4 text-[#C2DA58]	" />
            Talent Quest
          </span>
          <span className="flex-horizontal">
            <CheckCircleIcon className="mr-2 h-4 w-4 text-[#757575]	" />
            Partnership Quest
          </span>
        </div>
      </div>
      <div className="my-8">
        <Filter
          params={params}
          updateParams={(p: any) => {
            setParams(p);
            console.log(p);
          }}
        />
      </div>
      {!loading && (
        <>
          <Table dataSource={tableDate.dataSource} columns={tableDate.columns} />
          <div className="flex-horizontal mt-12 pb-20">
            {tableDate.dataSource.length > 0 && (
              <Pagination
                onChange={(current: number) => {
                  setCurrentPage(current);
                }}
                total={total}
                current={currentPage}
                pageSize={10}
              />
            )}
          </div>
        </>
      )}
      {loading && (
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
      {tableDate.dataSource.length > 0 && visibleView && (
        <Drawer
          createBySelf={type === QuestTypes.lssued}
          pob={pob}
          walletAddress={walletAddress}
          currentWorkflow={tableDate.dataSource[currentWorkflowIndex]}
          currentWorkflowIndex={currentWorkflowIndex}
          workflowLength={tableDate.dataSource.length}
          onNext={() => onChangeIndex('next')}
          onPrev={() => onChangeIndex('prev')}
          visible={visibleView}
          onClose={onClose}
        />
      )}
    </>
  );
}

export default QuestTab;
