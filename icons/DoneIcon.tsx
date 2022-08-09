/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const DoneIcon = ({ size = 18, color = '#2B2B2B', viewBox = '0 0 18 18', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" {...props}>
    <path
      d="M6.5 9L8.16667 10.6667L11.5 7.33333M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DoneIcon;
