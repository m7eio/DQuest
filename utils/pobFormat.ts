/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatBalance } from '@/utils/web3';
import { formatDateTime } from '@/utils/format';
import POB from '@m7eio/pob-js-sdk';
import { ipfs } from '@m7eio/pob-js-sdk';

const { getJSONFromIPFS } = ipfs;
const rewardUnit = {
  '0x542e99ef0ff07afc8cddab29ef4d50a74a299097': 'POB',
};

export const formatWorkflow = async (
  workflows: Array<any>,
  QuestTypes?: any,
  questType?: any,
  pob?: POB,
  taker?: string,
) => {
  return Promise.all(
    workflows.map(async (doc: any, index: number) => {
      const {
        workflow,
        name,
        tags,
        createdAt,
        endTime,
        issuer,
        rewardsToken,
        sbtAddress,
        totalRewards,
        startTime,
        description,
        reviewer,
        // describe,
        extInfo,
        transactionHash,
      } = doc?.workflowInfo || doc;
      let statusResult;
      if (questType === QuestTypes?.Claimed && pob && taker) {
        const workFlowStatus = await pob.workflow.getTakerStatus(workflow, taker);
        if (workFlowStatus.status === 'success') {
          if (
            workFlowStatus.data.status === 'applied' ||
            workFlowStatus.data.status === 'approved'
          ) {
            const taskStatus = await pob.task.getTakerTaskStatus(workflow, 0, taker);
            if (taskStatus.status === 'success') {
              statusResult = taskStatus.data.status;
            } else {
              statusResult = workFlowStatus.data.status;
            }
          } else {
            statusResult = workFlowStatus.data.status;
          }
        }
      }
      let takerCount = 0,
        submittedCount = 0;
      if (questType === QuestTypes?.lssued && pob) {
        const takerList = await pob.workflow.getTakersWithStatus(workflow);
        if (takerList.status === 'success') {
          takerCount = takerList?.data?.docs?.length;
        }
        const submitedList = await pob.task.getTaskStatus(workflow, 0);
        if (submitedList.status === 'success') {
          submittedCount = submitedList?.data?.totalDocs;
        }
      }
      const { project, projectName } = extInfo;
      const value = formatBalance(totalRewards.value, totalRewards.decimals);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const unit = rewardUnit[rewardsToken.toLocaleLowerCase()];
      const type = sbtAddress && 'SBT';
      const createdAtString = formatDateTime(createdAt, 'YYYY-MM-DD');
      const startTimeString = formatDateTime(startTime, 'YYYY-MM-DD');
      const endTimeString = endTime ? formatDateTime(endTime, 'YYYY-MM-DD') : '';
      return {
        quest: name,
        tags,
        deadline: endTimeString,
        quest_issuer: { issuer, project, projectName },
        reward: { type, value, unit },
        action: { action: 'view', index, currentWorkflow: workflow },
        workflow,
        date_range: { startTimeString, endTimeString },
        description,
        reviewer,
        sbtAddress,
        issuer,
        status: statusResult,
        create_date: createdAtString,
        submitted_claimed: { claimed: takerCount, submitted: submittedCount },
        transactionHash,
      };
    }),
  );
};

export const formatTask = (task: any) => {
  const { remainingRewards, totalRewards } = task;
  const remainingRewardsValue = formatBalance(remainingRewards.value, remainingRewards.decimals);
  const totalRewardsValue = formatBalance(totalRewards.value, totalRewards.decimals);
  return { remainingRewardsValue, totalRewardsValue };
};

export const formatTakerList = async (list: Array<any>, pob: POB) => {
  return Promise.all(
    list.map(async (doc: any, index: number) => {
      const {
        // blockHash,
        // createdAt,
        // status,
        taker,
        // transactionHash,
        // transactionIndex,
        updatedAt,
        workflow,
      } = doc;
      const submission_date = formatDateTime(updatedAt, 'YYYY-MM-DD HH:mm:ss');
      let statusResult, rewards;
      const workFlowStatus = await pob.workflow.getTakerStatus(workflow, taker);
      if (workFlowStatus.status === 'success') {
        if (workFlowStatus.data.status === 'applied' || workFlowStatus.data.status === 'approved') {
          const taskStatus = await pob.task.getTakerTaskStatus(workflow, 0, taker);
          if (taskStatus.status === 'success') {
            statusResult = taskStatus.data.status;
            rewards = taskStatus.data.rewards;
          } else {
            statusResult = workFlowStatus.data.status;
          }
        } else {
          statusResult = workFlowStatus.data.status;
        }
      }
      const submittedContent = await pob.task.getTakerTaskLog(workflow, 0, taker, ['submitted']);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { content } =
        submittedContent?.data?.docs?.length > 0 &&
        (await getJSONFromIPFS(submittedContent?.data?.docs[0]?.content));

      const reward_allocation = rewards ? formatBalance(rewards.value, rewards.decimals) : null;
      return {
        submission_date,
        quest_taker: taker,
        reward_allocation,
        status: statusResult,
        description: {
          taker,
          status: statusResult,
          content,
        },
        expand: { taker, status: statusResult },
        workflow,
      };
    }),
  );
};

export const formatSbtImg = (sbtImgHash: string) => {
  if (!sbtImgHash) return;
  if (sbtImgHash.includes('ipfs://')) {
    return sbtImgHash.replace('ipfs://', 'https://ipfs.nftstorage.link/ipfs/');
  } else {
    return `https://ipfs.nftstorage.link/ipfs/${sbtImgHash}`;
  }
};
