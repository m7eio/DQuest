import React from 'react';
import { IconProps } from './index';

const SearchIcon = ({ ...props }: IconProps) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
    <path
      d="M13.25 13.25L9.08333 9.08333M10.4722 5.61111C10.4722 8.29583 8.29583 10.4722 5.61111 10.4722C2.92639 10.4722 0.75 8.29583 0.75 5.61111C0.75 2.92639 2.92639 0.75 5.61111 0.75C8.29583 0.75 10.4722 2.92639 10.4722 5.61111Z"
      stroke="#757575"
      strokeWidth="1.13"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SearchIcon;
