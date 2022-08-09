/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const ProjectIcon = ({
  size = 14,
  color = '#6C8015',
  viewBox = '0 0 14 16',
  ...props
}: IconProps) => (
  <svg width={14} height={16} viewBox={viewBox} {...props} fill="none">
    <path
      d="M4.6658 8H9.33247M4.6658 11.1111H9.33247M10.888 15H3.11024C2.25113 15 1.55469 14.3036 1.55469 13.4444V2.55556C1.55469 1.69645 2.25113 1 3.11024 1H7.45474C7.66102 1 7.85886 1.08194 8.00472 1.22781L12.2158 5.43886C12.3616 5.58472 12.4436 5.78255 12.4436 5.98883V13.4444C12.4436 14.3036 11.7471 15 10.888 15Z"
      stroke={color}
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ProjectIcon;
