/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const DeleteIcon = ({
  size = 14,
  color = '#454545',
  viewBox = '0 0 14 14',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" {...props}>
    <path
      d="M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
      fill="#FFFBF2"
    />
    <path
      d="M6.03704 8.62963L7.33333 7.33333M7.33333 7.33333L8.62963 6.03704M7.33333 7.33333L6.03704 6.03704M7.33333 7.33333L8.62963 8.62963M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
      stroke={color}
      strokeWidth="1.39167"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DeleteIcon;
