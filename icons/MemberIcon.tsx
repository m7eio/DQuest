/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const MemberIcon = ({
  size = 16,
  color = '#757575',
  viewBox = '0 0 20 16',
  ...props
}: IconProps) => (
  <svg width={20} height={16} viewBox={viewBox} {...props} fill="none">
    <path
      d="M14.168 14.6666H18.3346V13C18.3346 11.6193 17.2153 10.5 15.8346 10.5C15.0383 10.5 14.3289 10.8723 13.8711 11.4524M14.168 14.6666H5.83464M14.168 14.6666V13C14.168 12.4531 14.0626 11.9309 13.8711 11.4524M5.83464 14.6666H1.66797V13C1.66797 11.6193 2.78726 10.5 4.16797 10.5C4.96431 10.5 5.67368 10.8723 6.13151 11.4524M5.83464 14.6666V13C5.83464 12.4531 5.93999 11.9309 6.13151 11.4524M6.13151 11.4524C6.74589 9.9175 8.24698 8.83331 10.0013 8.83331C11.7556 8.83331 13.2567 9.9175 13.8711 11.4524M12.5013 3.83331C12.5013 5.21402 11.382 6.33331 10.0013 6.33331C8.62059 6.33331 7.5013 5.21402 7.5013 3.83331C7.5013 2.4526 8.62059 1.33331 10.0013 1.33331C11.382 1.33331 12.5013 2.4526 12.5013 3.83331ZM17.5013 6.33331C17.5013 7.25379 16.7551 7.99998 15.8346 7.99998C14.9142 7.99998 14.168 7.25379 14.168 6.33331C14.168 5.41284 14.9142 4.66665 15.8346 4.66665C16.7551 4.66665 17.5013 5.41284 17.5013 6.33331ZM5.83464 6.33331C5.83464 7.25379 5.08844 7.99998 4.16797 7.99998C3.24749 7.99998 2.5013 7.25379 2.5013 6.33331C2.5013 5.41284 3.24749 4.66665 4.16797 4.66665C5.08844 4.66665 5.83464 5.41284 5.83464 6.33331Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MemberIcon;
