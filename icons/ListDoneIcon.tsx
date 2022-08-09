/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const ListDoneIcon = ({
  size = 24,
  viewBox = '0 0 24 24',
  color = '#737373',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" {...props}>
    <path
      d="M19.5 9.75C19.5 13.8938 16.1438 18.75 12 18.75C7.85625 18.75 4.5 13.8938 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.0125 18.6562L14.25 21.75H9.75L10.9875 18.6562"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.75 5.31543C13.6715 5.46887 14.5221 5.9065 15.1827 6.5671C15.8433 7.22771 16.2809 8.07826 16.4344 8.9998"
      stroke="#737373"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ListDoneIcon;
