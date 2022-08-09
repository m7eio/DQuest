/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const UploadAvatarIcon = ({
  size = 18,
  color = '#2B2B2B',
  viewBox = '0 0 18 18',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props} fill="none">
    <path
      d="M7.125 13.1667L6.5 15.6667L5.66667 16.5H12.3333L11.5 15.6667L10.875 13.1667M1.5 9.83333H16.5M3.16667 13.1667H14.8333C15.7538 13.1667 16.5 12.4205 16.5 11.5V3.16667C16.5 2.24619 15.7538 1.5 14.8333 1.5H3.16667C2.24619 1.5 1.5 2.24619 1.5 3.16667V11.5C1.5 12.4205 2.24619 13.1667 3.16667 13.1667Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default UploadAvatarIcon;
