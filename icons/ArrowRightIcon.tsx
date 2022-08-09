/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const ArrowRightIcon = ({ size = 24, viewBox = '0 0 24 24', ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export default ArrowRightIcon;
