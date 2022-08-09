/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const TwitterIcon = ({
  size = 24,
  color = '#2B2B2B',
  viewBox = '-6 -6 24 24',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props}>
    <path
      d="M12 1.25C11.55 1.475 11.1 1.55 10.575 1.625C11.1 1.325 11.475 0.875 11.625 0.275C11.175 0.575 10.65 0.725 10.05 0.875C9.6 0.425 8.925 0.125 8.25 0.125C6.675 0.125 5.475 1.625 5.85 3.125C3.825 3.05 2.025 2.075 0.75 0.575C0.075 1.7 0.45 3.125 1.5 3.875C1.125 3.875 0.75 3.725 0.375 3.575C0.375 4.7 1.2 5.75 2.325 6.05C1.95 6.125 1.575 6.2 1.2 6.125C1.5 7.1 2.4 7.85 3.525 7.85C2.625 8.525 1.275 8.9 0 8.75C1.125 9.425 2.4 9.875 3.75 9.875C8.325 9.875 10.875 6.05 10.725 2.525C11.25 2.225 11.7 1.775 12 1.25Z"
      fill={color}
    />
  </svg>
);

export default TwitterIcon;
