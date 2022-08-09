/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const ScoutIcon = ({
  size = 14,
  color = '#2b2b2b',
  viewBox = '0 0 14 14',
  ...props
}: IconProps) => (
  <svg width={size} height={size} viewBox={viewBox} {...props}>
    <path
      d="M13.5999 5.05994L12.9332 2.47994C12.8653 2.22373 12.7472 1.98357 12.5856 1.77342C12.4241 1.56327 12.2224 1.38733 11.9922 1.25582C11.7621 1.12432 11.5081 1.03987 11.2451 1.00738C10.982 0.974902 10.7151 0.995034 10.4599 1.06661L9.17323 1.41328C9.08811 1.43571 9.00827 1.47477 8.93833 1.52821C8.86838 1.58166 8.80972 1.64842 8.76571 1.72466C8.72171 1.80089 8.69323 1.88509 8.68194 1.97238C8.67064 2.05968 8.67674 2.14835 8.69989 2.23328L8.87323 2.89994L1.79323 4.77328C1.62279 4.81866 1.47728 4.92973 1.38856 5.08217C1.29984 5.23461 1.27515 5.416 1.31989 5.58661L1.49323 6.25328L0.826561 6.42661C0.64975 6.44871 0.488961 6.54015 0.379564 6.6808C0.270168 6.82145 0.221126 6.9998 0.243228 7.17661C0.265329 7.35342 0.356763 7.51421 0.497416 7.62361C0.638068 7.733 0.816417 7.78205 0.993228 7.75994C1.0508 7.76686 1.10899 7.76686 1.16656 7.75994L1.83323 7.57994L2.00656 8.24661C2.0525 8.41494 2.1626 8.55855 2.31323 8.64661C2.41418 8.70653 2.52917 8.73872 2.64656 8.73994C2.7039 8.75003 2.76256 8.75003 2.81989 8.73994L4.99989 8.05328V8.33328C5.00036 8.62928 5.06878 8.92123 5.19989 9.18661L1.86656 12.5199C1.74103 12.6446 1.67015 12.814 1.66952 12.9909C1.6689 13.1678 1.73858 13.3377 1.86323 13.4633C1.98788 13.5888 2.15729 13.6597 2.3342 13.6603C2.51111 13.6609 2.68103 13.5913 2.80656 13.4666L6.13989 10.1333L6.32656 10.2066V14.3333C6.32656 14.5101 6.3968 14.6797 6.52182 14.8047C6.64685 14.9297 6.81642 14.9999 6.99323 14.9999C7.17004 14.9999 7.33961 14.9297 7.46463 14.8047C7.58966 14.6797 7.65989 14.5101 7.65989 14.3333V10.2133C7.72594 10.1907 7.79051 10.1639 7.85323 10.1333L11.1866 13.4666C11.3121 13.5913 11.482 13.6609 11.6589 13.6603C11.8358 13.6597 12.0052 13.5888 12.1299 13.4633C12.2545 13.3377 12.3242 13.1678 12.3236 12.9909C12.323 12.814 12.2521 12.6446 12.1266 12.5199L8.79323 9.18661C8.92264 8.92032 8.99313 8.62927 8.99989 8.33328V6.99994L9.89989 6.75994L10.0666 7.42661C10.1056 7.57205 10.1928 7.69998 10.3138 7.78956C10.4349 7.87914 10.5827 7.9251 10.7332 7.91994H10.9066L12.1932 7.57328C12.4533 7.50502 12.6969 7.38503 12.9095 7.22048C13.1222 7.05593 13.2994 6.8502 13.4307 6.61558C13.5621 6.38097 13.6447 6.12228 13.6738 5.85499C13.7028 5.5877 13.6777 5.3173 13.5999 5.05994V5.05994ZM7.66656 8.33328C7.66588 8.50492 7.59901 8.66969 7.47989 8.79328V8.79328C7.35631 8.9124 7.19154 8.97926 7.01989 8.97994C6.845 8.97921 6.6774 8.90977 6.55323 8.78661C6.43006 8.66244 6.36063 8.49484 6.35989 8.31994V7.65328L7.66656 7.33328V8.33328ZM3.12656 7.17328L2.77989 5.88661L9.21989 4.15994L9.39323 4.82661L9.56656 5.49328L3.12656 7.17328ZM12.2466 5.90661C12.2028 5.98312 12.1444 6.05021 12.0746 6.10399C12.0048 6.15777 11.925 6.19718 11.8399 6.21994L11.1732 6.39328L10.6532 4.45994L10.3332 3.17328L10.1599 2.50661L10.8266 2.33328C10.9115 2.31013 11.0002 2.30402 11.0875 2.31532C11.1747 2.32662 11.2589 2.35509 11.3352 2.39909C11.4114 2.4431 11.4782 2.50177 11.5316 2.57171C11.5851 2.64166 11.6241 2.72149 11.6466 2.80661L12.3132 5.38661C12.3378 5.47329 12.3446 5.56406 12.3332 5.65344C12.3217 5.74281 12.2922 5.82894 12.2466 5.90661Z"
      fill={`${color}`}
    />
  </svg>
);

export default ScoutIcon;
