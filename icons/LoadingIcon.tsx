/* eslint-disable react/no-unknown-property */
import React from 'react';
import { IconProps } from './index';

const LoadingIcon = ({
  size = 14,
  color = '#575757',
  viewBox = '0 0 14 14',
  ...props
}: IconProps) => (
  <svg width={11} height={14} viewBox={viewBox} {...props}>
    <path
      fill={color}
      d="M13.0007 6.33331C12.8238 6.33331 12.6543 6.40355 12.5292 6.52858C12.4042 6.6536 12.334 6.82317 12.334 6.99998C12.3419 8.24867 11.9142 9.46103 11.1244 10.4283C10.3347 11.3955 9.23234 12.0571 8.00729 12.2991C6.78225 12.541 5.51117 12.3482 4.41299 11.7538C3.3148 11.1595 2.45826 10.2008 1.99087 9.04281C1.52348 7.88487 1.47451 6.60019 1.8524 5.41003C2.23028 4.21987 3.01137 3.19874 4.06112 2.5225C5.11087 1.84626 6.36358 1.55725 7.60349 1.70525C8.8434 1.85325 9.99289 2.42899 10.854 3.33331H9.25399C9.07718 3.33331 8.90761 3.40355 8.78258 3.52857C8.65756 3.6536 8.58732 3.82317 8.58732 3.99998C8.58732 4.17679 8.65756 4.34636 8.78258 4.47138C8.90761 4.59641 9.07718 4.66665 9.25399 4.66665H12.274C12.4508 4.66665 12.6204 4.59641 12.7454 4.47138C12.8704 4.34636 12.9407 4.17679 12.9407 3.99998V0.999979C12.9407 0.823169 12.8704 0.653599 12.7454 0.528575C12.6204 0.403551 12.4508 0.333313 12.274 0.333313C12.0972 0.333313 11.9276 0.403551 11.8026 0.528575C11.6776 0.653599 11.6073 0.823169 11.6073 0.999979V2.17998C10.4971 1.11869 9.05449 0.473281 7.52333 0.352865C5.99218 0.23245 4.46641 0.644409 3.20393 1.51911C1.94146 2.3938 1.01973 3.67758 0.594539 5.15344C0.169352 6.6293 0.266793 8.2067 0.870392 9.619C1.47399 11.0313 2.54672 12.1919 3.90725 12.9045C5.26778 13.6172 6.83265 13.8382 8.33735 13.5303C9.84204 13.2223 11.1943 12.4043 12.1654 11.2144C13.1366 10.0246 13.6671 8.53586 13.6673 6.99998C13.6673 6.82317 13.5971 6.6536 13.4721 6.52858C13.347 6.40355 13.1775 6.33331 13.0007 6.33331Z"
    />
  </svg>
);

export default LoadingIcon;
