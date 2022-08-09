/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const RemoveMemberIcon = ({
  size = 17,
  color = '#757575',
  viewBox = '0 0 17 17',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props} fill="none">
    <path
      d="M7.33333 10.6667L9 9M9 9L10.6667 7.33333M9 9L7.33333 7.33333M9 9L10.6667 10.6667M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
      stroke="#454545"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default RemoveMemberIcon;
