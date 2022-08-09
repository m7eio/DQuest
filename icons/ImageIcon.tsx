/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const ImageIcon = ({
  size = 16,
  color = '#757575',
  viewBox = '0 0 16 16',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" {...props}>
    <path
      d="M1.33203 11.3333L5.15352 7.51182C5.80439 6.86095 6.85967 6.86095 7.51054 7.51182L11.332 11.3333M9.66536 9.66665L10.9869 8.34516C11.6377 7.69428 12.693 7.69428 13.3439 8.34516L14.6654 9.66665M9.66536 4.66665H9.6737M2.9987 14.6666H12.9987C13.9192 14.6666 14.6654 13.9205 14.6654 13V2.99998C14.6654 2.07951 13.9192 1.33331 12.9987 1.33331H2.9987C2.07822 1.33331 1.33203 2.07951 1.33203 2.99998V13C1.33203 13.9205 2.07822 14.6666 2.9987 14.6666Z"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ImageIcon;
