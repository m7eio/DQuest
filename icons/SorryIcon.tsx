/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const SorryIcon = ({ size = 12, viewBox = '0 0 17 18', ...props }: IconProps) => (
  <svg width={17} height={18} viewBox={viewBox} fill="none" {...props}>
    <path
      d="M10.857 12.4764C9.55523 11.1746 7.44468 11.1746 6.14293 12.4764M11 7.33333H10.9917M6 7.33333H5.99167M1 9C1 13.1421 4.35786 16.5 8.5 16.5C12.6421 16.5 16 13.1421 16 9C16 4.85786 12.6421 1.5 8.5 1.5C4.35786 1.5 1 4.85786 1 9Z"
      stroke="#454545"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default SorryIcon;
