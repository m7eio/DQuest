/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const ArrowDownDoubleIcon = ({
  size = 16,
  color = '#454545',
  viewBox = '0 0 32 32',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props}>
    <path
      fill="none"
      stroke={color}
      strokeWidth="2.67"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M27 16.8L16 28L5 16.8M27 4L16 15.2L5 4"
    />
  </svg>
);

export default ArrowDownDoubleIcon;
