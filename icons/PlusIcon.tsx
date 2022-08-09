/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const PlusIcon = ({ size = 16, color = '#454545', viewBox = '0 0 16 16', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props}>
    <path
      fill="none"
      stroke={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 4.5V12.5M12 8.5L4 8.5"
    />
  </svg>
);

export default PlusIcon;
