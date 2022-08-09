/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const FollowIcon = ({
  size = 18,
  color = '#575757',
  viewBox = '0 0 18 18',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props}>
    <path
      fill={color}
      d="M7.33317 2.33341C5.49222 2.33341 3.99984 3.8258 3.99984 5.66675C3.99984 7.5077 5.49222 9.00008 7.33317 9.00008C9.17412 9.00008 10.6665 7.5077 10.6665 5.66675C10.6665 3.8258 9.17412 2.33341 7.33317 2.33341ZM2.33317 5.66675C2.33317 2.90532 4.57175 0.666748 7.33317 0.666748C10.0946 0.666748 12.3332 2.90532 12.3332 5.66675C12.3332 8.42817 10.0946 10.6667 7.33317 10.6667C4.57175 10.6667 2.33317 8.42817 2.33317 5.66675ZM14.8332 8.16675C15.2934 8.16675 15.6665 8.53984 15.6665 9.00008V9.83342H16.4998C16.9601 9.83342 17.3332 10.2065 17.3332 10.6667C17.3332 11.127 16.9601 11.5001 16.4998 11.5001H15.6665V12.3334C15.6665 12.7937 15.2934 13.1667 14.8332 13.1667C14.3729 13.1667 13.9998 12.7937 13.9998 12.3334V11.5001H13.1665C12.7063 11.5001 12.3332 11.127 12.3332 10.6667C12.3332 10.2065 12.7063 9.83342 13.1665 9.83342H13.9998V9.00008C13.9998 8.53984 14.3729 8.16675 14.8332 8.16675ZM4.4165 14.0001C3.36696 14.0001 2.33317 15.0114 2.33317 16.5001C2.33317 16.9603 1.96007 17.3334 1.49984 17.3334C1.0396 17.3334 0.666504 16.9603 0.666504 16.5001C0.666504 14.3069 2.24439 12.3334 4.4165 12.3334H10.2498C12.422 12.3334 13.9998 14.3069 13.9998 16.5001C13.9998 16.9603 13.6267 17.3334 13.1665 17.3334C12.7063 17.3334 12.3332 16.9603 12.3332 16.5001C12.3332 15.0114 11.2994 14.0001 10.2498 14.0001H4.4165Z"
    />
  </svg>
);

export default FollowIcon;