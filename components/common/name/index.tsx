import React from 'react';
import classnames from 'classnames';
import { lookupAddress } from '@/utils/ens';
import { formatAddress } from '@/utils/web3';

export interface IProps {
  className?: string;
  address: string;
  name?: string;
  link?: boolean;
  dataCallback?: (data: {
    address?: string;
    nickname?: string;
    avatar?: string;
    lockFlag?: unknown;
  }) => void;
}

export default function Name({ className, address, name, link, dataCallback }: IProps) {
  const [innerName, setInnerName] = React.useState(formatAddress(address));

  const renderAddress = React.useCallback(async () => {
    if (name) {
      return setInnerName(name);
    }

    const ens = await lookupAddress(address);

    if (ens) {
      return setInnerName(ens);
    }

    setInnerName(formatAddress(address));
  }, [name, address]);

  React.useEffect(() => {
    renderAddress();
  }, [address, name]);

  return link ? (
    <a
      href={`/profile/${address}`}
      className={classnames('text-sm font-medium underline', className)}
    >
      {innerName}
    </a>
  ) : (
    <span className={classnames('text-sm font-medium', className)}>{innerName}</span>
  );
}
