/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const SingleArrowDownIcon = ({
  size = 12,
  color = '#6C8015',
  viewBox = '0 0 12 7',
  ...props
}: IconProps) => (
  <svg width={size} height={7} viewBox={viewBox} fill="none" {...props}>
    <path
      d="M11 1L6 6L1 1"
      stroke={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SingleArrowDownIcon;
