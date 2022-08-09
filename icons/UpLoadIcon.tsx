/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const UpLoadIcon = ({
  size = 10,
  viewBox = '0 0 10 10',
  color = '#2B2B2B',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" {...props}>
    <path
      d="M0.5 7.08317L0.5 7.604C0.5 8.46695 1.19956 9.1665 2.0625 9.1665L7.27083 9.1665C8.13378 9.1665 8.83333 8.46695 8.83333 7.604L8.83333 7.08317M6.75 2.9165L4.66667 0.833171M4.66667 0.833171L2.58333 2.9165M4.66667 0.833171L4.66667 7.08317"
      stroke={color}
      strokeWidth="0.941667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default UpLoadIcon;
