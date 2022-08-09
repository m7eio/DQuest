import { createUseStyles } from 'react-jss';

export default createUseStyles({
  uploadContent: {
    '& .close-button': {
      display: 'hidden',
      opacity: 0,
    },
    '&:hover .close-button': {
      display: 'block',
      opacity: 1,
    },
  },
});
