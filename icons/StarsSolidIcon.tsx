import React from 'react';
import { IconProps } from './index';

const StarsSolidIcon = ({ ...props }: IconProps) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.875 0C2.22018 0 2.5 0.279822 2.5 0.625V1.25H3.125C3.47018 1.25 3.75 1.52982 3.75 1.875C3.75 2.22018 3.47018 2.5 3.125 2.5H2.5V3.125C2.5 3.47018 2.22018 3.75 1.875 3.75C1.52982 3.75 1.25 3.47018 1.25 3.125V2.5H0.625C0.279822 2.5 0 2.22018 0 1.875C0 1.52982 0.279822 1.25 0.625 1.25H1.25V0.625C1.25 0.279822 1.52982 0 1.875 0ZM1.875 6.25C2.22018 6.25 2.5 6.52982 2.5 6.875V7.5H3.125C3.47018 7.5 3.75 7.77982 3.75 8.125C3.75 8.47018 3.47018 8.75 3.125 8.75H2.5V9.375C2.5 9.72018 2.22018 10 1.875 10C1.52982 10 1.25 9.72018 1.25 9.375V8.75H0.625C0.279822 8.75 0 8.47018 0 8.125C0 7.77982 0.279822 7.5 0.625 7.5H1.25V6.875C1.25 6.52982 1.52982 6.25 1.875 6.25Z"
      fill="#121212"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.24997 0C6.53355 0 6.78159 0.190927 6.85416 0.465067L7.59117 3.24933L9.68729 4.45863C9.88077 4.57025 9.99997 4.77664 9.99997 5C9.99997 5.22336 9.88077 5.42975 9.68729 5.54137L7.59117 6.75067L6.85416 9.53493C6.78159 9.80907 6.53355 10 6.24997 10C5.96638 10 5.71834 9.80907 5.64578 9.53493L4.90876 6.75067L2.81267 5.54136C2.6192 5.42974 2.5 5.22336 2.5 5C2.5 4.77664 2.6192 4.57026 2.81267 4.45864L4.90876 3.24933L5.64578 0.465067C5.71834 0.190927 5.96638 0 6.24997 0Z"
      fill="#121212"
    />
  </svg>
);

export default StarsSolidIcon;
