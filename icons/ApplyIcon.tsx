/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const AddIcon = ({ size = 12, color = '#D8543C', viewBox = '0 0 12 12', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props}>
    <path
      d="M6 1V11M11 6L1 6"
      stroke={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AddIcon;
