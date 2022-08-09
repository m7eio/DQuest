import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import POB, { ipfs, utils } from '@m7eio/pob-js-sdk';
import { useRouter } from 'next/router';
import FormButton from '@/components/common/button/FormSubmitButton';
import FormInputItem from '@/components/common/form/FormInputItem';
import FormTextareaItem from '@/components/common/form/FormTextareaItem';
import FormDatePickerItem from '@/components/common/form/form-date-picker-item';
import FormInputGroupItem from '@/components/common/form/form-input-group-item';
import FormUploadItem from '@/components/common/form/form-upload-item';
import FormRadioItem, { modeType } from '@/components/common/form/form-radio-item';
import { useWalletProvider } from '@/components/web3modal';

import { notification } from '@/components/common/notification/index';

const { formatBalance, parseBalance } = utils;
const { saveToIPFS } = ipfs;

const { setLocale } = Yup;
function CreateQuest() {
  const [skillsByCategory, setSkillsByCategory] = useState<{
    [id: string]: string[];
  }>({});

  const [loading, setLoading] = useState<boolean>(false);
  const [validateAuthLoading, setValidateAuthLoading] = useState<boolean>(false);
  const [curSelectSkill, setCurSelectSkill] = useState(0);
  const router = useRouter();

  const initialFormData = {
    title: '',
    description: '',
    linkProjectName: '',
    linkProjects: '',
    date: ['', ''],
    skills: 0,
    tags: [],
    reward: [undefined, '0x542E99eF0FF07aFC8CdDaB29EF4d50A74A299097'],
    type: modeType.SINGLE,
    image: '',
    name: '',
    symbol: '',
  };
  const { data } = useWalletProvider();
  const { address: walletAddress, chainId, ethersProvider: provider } = data || {};

  const authPob = async () => {
    if (!provider) return;
    const pob = new POB(provider);
    pob.tokenApprove('0x542E99eF0FF07aFC8CdDaB29EF4d50A74A299097');
  };

  const checkAuthStatus = async (value?: number) => {
    setValidateAuthLoading(true);
    if (typeof value !== 'number') return;
    if (!provider || !walletAddress) return;
    const pob = new POB(provider);
    const resp = await pob.tokenAllowance(
      '0x542E99eF0FF07aFC8CdDaB29EF4d50A74A299097',
      walletAddress,
    );
    const parsedValue = parseBalance(`${value}`, 18) || 0;
    console.log(57, value, parsedValue, walletAddress, resp, resp.lte(`${parsedValue}`));

    if (resp.lte(`${parsedValue}`)) {
      await authPob();
      setValidateAuthLoading(false);
    }
    setValidateAuthLoading(false);
  };

  const handleSubmit = async (values: any) => {
    if (!provider || loading) return;
    setLoading(true);
    const { title, description, date, type, tags, reward, name, symbol, image } = values;
    console.log(86, 'values + ', Date.now(), values);

    try {
      const hash = await saveToIPFS({ name, description: symbol, image: `ipfs://${image}` });
      const pob = new POB(provider);
      const tx = await pob.workflow.create(
        1,
        {
          name,
          symbol,
          defaultURI: `ipfs://${hash}`,
        },
        {
          inOrder: true,
          minimumTasks: 0,
          startTime: date[0],
          endTime: date[1] || 0,
          reviewer: walletAddress as string,
          rewardsToken: reward[1] || '0x542E99eF0FF07aFC8CdDaB29EF4d50A74A299097',
          // rewardsToken: reward[1], // pob 当前只有一种
          // feeToken: '0x542E99eF0FF07aFC8CdDaB29EF4d50A74A299097',
          // feeReceiver: '0x0000000000000000000000000000000000000000',
          describe: {
            name: title,
            description,
            namespace: 'DQuest',
            tags: tags.split(','),
          },
          feeReceiver: '',
        },
        [
          {
            onlyOneWinner: type === modeType.SINGLE,
            taskIndex: 3,
            reviewer: walletAddress as string,
            totalRewards: reward[0],
            feeAmount: '0',
            deadline: date[1] - 1000 || 0,
            describe: {
              name: title,
              description,
            },
          },
        ],
      );

      if (tx.wait) {
        await tx.wait();
      }
      notification.success('Create Succes');
      router.push(`/quest`);
    } catch (error: any) {
      setLoading(false);
      notification.error(error.message);
      throw new Error(error);
    }
    setLoading(false);
  };
  setLocale({
    mixed: {
      notType: `field invalid`,
    },
  });
  return (
    <div>
      <Formik
        initialValues={initialFormData}
        validateOnBlur={false}
        validate={(values) => {
          console.log(169, values);
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .required('cannot be empty')
            .min(3, '3 At least 3 characters')
            .max(80, '80 characters or less'),
          description: Yup.string()
            .required('cannot be empty')
            .max(1000, '1000 characters or less'),
          date: Yup.tuple([
            Yup.number()
              .moreThan(0, 'cannot be empty')
              .label('startDate')
              .required('startDate cannot be empty'),
            Yup.number().label('endDate'),
          ]),
          tags: Yup.string().required('cannot be empty, splited by commas.'),
          reward: Yup.tuple([
            Yup.number().label('number').min(0).required('reward cannot be empty'),
            Yup.string().label('type'),
          ]),
          image: Yup.string().required('cannot be empty'),
          name: Yup.string().required('cannot be empty').max(80, '80 characters or less'),
          symbol: Yup.string().required('cannot be empty').max(80, '80 characters or less'),
        })}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form className="relative mb-12 flex flex-col items-center justify-center rounded-3xl  py-10">
          <div className="grid grid-cols-2 gap-10">
            <div className="relative">
              <div className="my-8 flex flex-col space-y-1">
                <FormInputItem label="Title" name="title" placeholder="Quest Title" />
              </div>
              <div className="my-8 flex flex-col space-y-1">
                <FormTextareaItem
                  label="Description"
                  name="description"
                  placeholder="Description"
                />
              </div>
              <div>
                <FormDatePickerItem label="Date" name="date" placeholder="Date" />
              </div>
              <div className="my-8 flex flex-col space-y-1">
                <FormInputItem
                  label="Tags"
                  name="tags"
                  placeholder="Quest tags, splited by commas."
                />
              </div>
            </div>
            <div className="relative">
              <div className="my-8 flex flex-col space-y-1">
                <FormInputGroupItem
                  loading={validateAuthLoading}
                  validateAuth={checkAuthStatus}
                  label="Reward"
                  name="reward"
                  placeholder="role"
                />
              </div>

              <div className="my-8 flex flex-col space-y-1">
                <FormRadioItem name="type" placeholder="role" />
              </div>

              <label htmlFor="SBT" className="text-sm font-semibold text-neutral-800">
                SBT
              </label>
              <div className="flex-horizontal justify-between bg-[#F7F5EF] p-[20px]">
                <div className="h-[200px] rounded-md">
                  <FormUploadItem
                    name="image"
                    placeholder="image"
                    curSelectSkill={curSelectSkill}
                    className="relative h-full outline-none"
                  />
                </div>
              </div>

              <div className="space-y-8 rounded-md bg-[#F7F5EF] p-[20px]">
                <div className="">
                  <FormInputItem
                    label="Name"
                    name="name"
                    placeholder="NFT name, like Bored Ape Yacht Club."
                  />
                </div>
                <div className="">
                  <FormInputItem
                    label="Symbol"
                    name="symbol"
                    placeholder="NFT symbol, like BAYC."
                  />
                </div>
              </div>
            </div>
          </div>
          <FormButton className="mt-8" loading={loading} loadingText="Confirm" text="Confirm" />
        </Form>
      </Formik>
    </div>
  );
}

export default CreateQuest;
