import React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

export interface IProps {
  ImgClassName?: string;
  paperStyles?: any;
  diameter?: number;
  address?: string | null;
  avatar?: string | null;
  link?: boolean;
}

export default function Avatar({
  ImgClassName = 'w-full h-full',
  paperStyles,
  diameter = 32,
  address,
  avatar,
  link,
}: IProps) {
  const render = () => {
    return (
      <>
        {avatar ? (
          <img src={avatar} className={ImgClassName} />
        ) : address ? (
          <Jazzicon
            diameter={diameter}
            seed={jsNumberForAddress(address)}
            paperStyles={paperStyles}
          />
        ) : null}
      </>
    );
  };

  return link ? <a href={`/profile/${address}`}>{render()}</a> : <>{render()}</>;
}
