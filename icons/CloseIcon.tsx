/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const CloseIcon = ({
  size = 16,
  color = '#454545',
  viewBox = '0 0 32 32',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props}>
    <path
      d="M3 29L29 3M3 3L29 29"
      fill="none"
      stroke={color}
      strokeWidth="2.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CloseIcon;
