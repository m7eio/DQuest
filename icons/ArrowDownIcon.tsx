/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const ArrowDownIcon = ({ size = 24, viewBox = '0 0 24 24', ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
  </svg>
);

export default ArrowDownIcon;
