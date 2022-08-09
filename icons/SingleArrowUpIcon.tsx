/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const SingleArrowUpIcon = ({
  size = 12,
  color = '#757575',
  viewBox = '0 0 12 7',
  ...props
}: IconProps) => (
  <svg width={size} height={7} viewBox={viewBox} fill="none" {...props}>
    <path
      d="M11 6L6 1L1 6"
      stroke={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SingleArrowUpIcon;
