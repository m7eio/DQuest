/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const ViewIcon = ({ size = 12, viewBox = '0 0 14 18', ...props }: IconProps) => (
  <svg width={14} height={18} viewBox={viewBox} fill="none" {...props}>
    <path
      d="M8.07871 1.74408L7.37161 2.45118V2.45118L8.07871 1.74408ZM12.5906 6.25592L13.2977 5.54882L12.5906 6.25592ZM5.33464 15.5C4.78235 15.5 4.33464 15.9477 4.33464 16.5C4.33464 17.0523 4.78235 17.5 5.33464 17.5V15.5ZM0.167969 12.3333C0.167969 12.8856 0.615684 13.3333 1.16797 13.3333C1.72025 13.3333 2.16797 12.8856 2.16797 12.3333H0.167969ZM0.460862 15.7929C0.0703378 16.1834 0.0703377 16.8166 0.460862 17.2071C0.851386 17.5976 1.48455 17.5976 1.87508 17.2071L0.460862 15.7929ZM2.83464 2.5H7.48946V0.5H2.83464V2.5ZM11.8346 6.84518V14.8333H13.8346V6.84518H11.8346ZM7.37161 2.45118L11.8835 6.96303L13.2977 5.54882L8.78582 1.03697L7.37161 2.45118ZM13.8346 6.84518C13.8346 6.35895 13.6415 5.89263 13.2977 5.54882L11.8835 6.96303C11.8522 6.93177 11.8346 6.88938 11.8346 6.84518H13.8346ZM7.48946 2.5C7.44526 2.5 7.40286 2.48244 7.37161 2.45118L8.78582 1.03697C8.442 0.693154 7.97569 0.5 7.48946 0.5V2.5ZM11.168 17.5C12.6407 17.5 13.8346 16.3061 13.8346 14.8333H11.8346C11.8346 15.2015 11.5362 15.5 11.168 15.5V17.5ZM2.16797 3.16667C2.16797 2.79848 2.46645 2.5 2.83464 2.5V0.5C1.36188 0.5 0.167969 1.69391 0.167969 3.16667H2.16797ZM11.168 15.5H5.33464V17.5H11.168V15.5ZM2.16797 12.3333V3.16667H0.167969V12.3333H2.16797ZM8.5013 10.6667C8.5013 11.4951 7.82973 12.1667 7.0013 12.1667V14.1667C8.9343 14.1667 10.5013 12.5997 10.5013 10.6667H8.5013ZM5.5013 10.6667C5.5013 9.83824 6.17288 9.16667 7.0013 9.16667V7.16667C5.06831 7.16667 3.5013 8.73367 3.5013 10.6667H5.5013ZM7.0013 9.16667C7.82973 9.16667 8.5013 9.83824 8.5013 10.6667H10.5013C10.5013 8.73367 8.9343 7.16667 7.0013 7.16667V9.16667ZM4.52643 11.7273L0.460862 15.7929L1.87508 17.2071L5.94064 13.1415L4.52643 11.7273ZM7.0013 12.1667C6.58681 12.1667 6.21318 11.9999 5.94064 11.7273L4.52643 13.1415C5.15871 13.7738 6.03508 14.1667 7.0013 14.1667V12.1667ZM5.94064 11.7273C5.6681 11.4548 5.5013 11.0812 5.5013 10.6667H3.5013C3.5013 11.6329 3.89415 12.5093 4.52643 13.1415L5.94064 11.7273Z"
      fill="#454545"
    />
  </svg>
);

export default ViewIcon;