/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const EditMemberIcon = ({
  size = 17,
  color = '#454545',
  viewBox = '0 0 17 17',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props} fill="none">
    <path
      d="M7.16536 3.16667H2.9987C2.07822 3.16667 1.33203 3.91286 1.33203 4.83334V14C1.33203 14.9205 2.07822 15.6667 2.9987 15.6667H12.1654C13.0858 15.6667 13.832 14.9205 13.832 14V9.83334M12.6535 1.98816C13.3044 1.33728 14.3597 1.33728 15.0105 1.98816C15.6614 2.63903 15.6614 3.6943 15.0105 4.34518L7.85572 11.5H5.4987L5.4987 9.14298L12.6535 1.98816Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EditMemberIcon;
