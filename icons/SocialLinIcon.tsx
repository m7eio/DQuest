/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const SocialLinIcon = ({
  size = 18,
  color = '#757575',
  viewBox = '0 0 18 18',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props} fill="none">
    <path
      d="M1.54577 8.16667H3.16667C4.08714 8.16667 4.83333 8.91286 4.83333 9.83333V10.6667C4.83333 11.5871 5.57953 12.3333 6.5 12.3333C7.42047 12.3333 8.16667 13.0795 8.16667 14V16.4542M5.66667 2.2796V3.58333C5.66667 4.73393 6.59941 5.66667 7.75 5.66667H8.16667C9.08714 5.66667 9.83333 6.41286 9.83333 7.33333C9.83333 8.25381 10.5795 9 11.5 9C12.4205 9 13.1667 8.25381 13.1667 7.33333C13.1667 6.41286 13.9129 5.66667 14.8333 5.66667L15.7204 5.66667M11.5 16.0732V14C11.5 13.0795 12.2462 12.3333 13.1667 12.3333H15.7204M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SocialLinIcon;
