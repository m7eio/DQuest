import React from 'react';
import { IconProps } from './index';

const CheckedIcon = ({
  size = 12,
  color = '#2B2B2B',
  viewBox = '0 0 12 10',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.3167 0.904462C11.5076 1.0794 11.5205 1.37591 11.3455 1.56675L4.47054 9.06675C4.38415 9.161 4.26301 9.21587 4.13518 9.21864C4.00736 9.22142 3.88395 9.17187 3.79354 9.08146L0.668544 5.95646C0.485485 5.7734 0.485485 5.47661 0.668544 5.29355C0.851602 5.11049 1.1484 5.11049 1.33146 5.29355L4.11028 8.07237L10.6545 0.933257C10.8294 0.74242 11.1259 0.729528 11.3167 0.904462Z"
      fill={color}
      stroke={color}
      strokeWidth="0.833333"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  </svg>
);

export default CheckedIcon;
