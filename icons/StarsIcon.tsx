import React from 'react';
import { IconProps } from './index';

const StarsIcon = ({ ...props }: IconProps) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.11111 1V3.22222M1 2.11111H3.22222M2.66667 8.77778V11M1.55556 9.88889H3.77778M6.55556 1L7.8254 4.80952L11 6L7.8254 7.19048L6.55556 11L5.28571 7.19048L2.11111 6L5.28571 4.80952L6.55556 1Z"
      stroke="#121212"
      strokeWidth="1.13"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default StarsIcon;
