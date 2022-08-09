/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const BackIcon = ({ size = 18, color = '#2B2B2B', viewBox = '0 0 18 16', ...props }: IconProps) => (
  <svg width={size} height={16} viewBox={viewBox} {...props} fill="none">
    <path
      d="M1.5 6.33331H9.83333C13.5152 6.33331 16.5 9.31808 16.5 13V14.6666M1.5 6.33331L6.5 11.3333M1.5 6.33331L6.5 1.33331"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BackIcon;
