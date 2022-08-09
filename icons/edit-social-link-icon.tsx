/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const EditSocialLinkIcon = ({
  size = 28,
  color = '#2B2B2B',
  viewBox = '0 0 28 28',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props}>
    <rect width="28" height="28" rx="8" fill={color} />
    <path
      d="M15.4221 12.5779C14.2071 11.3629 12.2373 11.3629 11.0223 12.5779L7.91122 15.689C6.69626 16.904 6.69626 18.8738 7.91122 20.0888C9.12619 21.3037 11.096 21.3037 12.311 20.0888L13.1678 19.232M12.5779 15.4221C13.7929 16.6371 15.7627 16.6371 16.9777 15.4221L20.0888 12.311C21.3037 11.096 21.3037 9.12619 20.0888 7.91122C18.8738 6.69626 16.904 6.69626 15.689 7.91122L14.8337 8.76648"
      stroke="#FFFBF2"
      strokeWidth="1.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EditSocialLinkIcon;
