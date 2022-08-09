/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const AddIcon = ({ size = 16, color = '#454545', viewBox = '0 0 16 16', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props}>
    <path
      fill="none"
      stroke={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 5.66667V8M8 8V10.3333M8 8H10.3333M8 8H5.66667M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
    />
  </svg>
);

export default AddIcon;
