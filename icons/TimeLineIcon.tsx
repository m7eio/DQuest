/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const TimeLineIcon = ({
  size = 16,
  color = '#757575',
  viewBox = '0 0 20 16',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props} fill="none">
    <path
      d="M11.332 1.33331V11.3333L7.9987 9.66665L4.66536 11.3333V1.33331M2.9987 14.6666H12.9987C13.9192 14.6666 14.6654 13.9205 14.6654 13V2.99998C14.6654 2.07951 13.9192 1.33331 12.9987 1.33331H2.9987C2.07822 1.33331 1.33203 2.07951 1.33203 2.99998V13C1.33203 13.9205 2.07822 14.6666 2.9987 14.6666Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TimeLineIcon;
