import React, { FC, useCallback, useEffect, useState } from 'react';
import SortFilter, { orderType, sortType } from './sort-status';
import ActiveFilter, { statusType } from './active-filter';

type questFilterProps = {
  params: any;
  updateParams: (data: any) => void;
};

const QuestFilter: FC<questFilterProps> = ({ params, updateParams }) => {
  const [activeFilter, setActiveFilter] = useState<string>(statusType.ACTIVE);
  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>(sortType.CREATE_TIME);
  const [orderField, setOrderField] = useState<string>(orderType.DESC);
  const [disabled, setDisabled] = useState(false);

  const update = useCallback(() => {
    let sort = '';
    let filter = '';
    if (sortField === sortType.CREATE_TIME) {
      if (orderField === orderType.ASC) sort = 'createdAt_asc';
      if (orderField === orderType.DESC) sort = 'createdAt_desc';
    }
    if (sortField === sortType.DEADLINE_TIME) {
      if (orderField === orderType.ASC) sort = 'endTime_asc';
      if (orderField === orderType.DESC) sort = 'endTime_desc';
    }
    if (sortField === sortType.REWARD) {
      if (orderField === orderType.ASC) sort = 'totalRewards_value_asc';
      if (orderField === orderType.DESC) sort = 'totalRewards_value_desc';
    }
    if (activeFilter === statusType.ACTIVE) {
      const now = new Date().getTime();
      filter = `endTime:>=${now},endTime:0+workflowEnded:false`;
    }
    if (activeFilter === statusType.PASSED) {
      const now = new Date().getTime();
      filter = `endTime:<${now},workflowEnded:true`;
    }
    if (activeFilter === statusType.UPCOMING) {
      const now = new Date().getTime();
      filter = `startTime:>${now}+workflowEnded:false`;
    }
    if (skillFilter && skillFilter.length > 0) {
      filter += `+tags:[${skillFilter.map((e) => `'${e}'`)}]`;
    }
    updateParams({
      ...params,
      sort,
      filter: `(namespace:'DQuest')+(${filter})`,
    });
  }, [activeFilter, skillFilter, sortField, orderField]);

  useEffect(() => {
    update();
  }, [activeFilter, skillFilter, sortField, orderField]);

  return (
    <div className="flex-horizontal justify-between">
      <ActiveFilter
        disabled={disabled}
        statusField={activeFilter}
        updateStatusField={(data) => setActiveFilter(data)}
      />
      <div className="flex-horizontal justify-between">
        <SortFilter
          disabled={disabled}
          sortField={sortField}
          orderField={orderField}
          updateSortField={(data) => setSortField(data)}
          updateOrderField={(data) => setOrderField(data)}
        />
      </div>
    </div>
  );
};

export default QuestFilter;
