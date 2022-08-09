/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const EditIcon = ({ size = 18, color = '#757575', viewBox = '0 0 18 18', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props}>
    <path
      fill="none"
      d="M11.6935 3.36019L14.6398 6.30647M12.9435 2.11019C13.7571 1.2966 15.0762 1.2966 15.8898 2.11019C16.7034 2.92379 16.7034 4.24288 15.8898 5.05647L4.41667 16.5296H1.5V13.5537L12.9435 2.11019Z"
      stroke={color}
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EditIcon;
