import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pink: {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    purple: {
      color: 'white',
      backgroundColor: theme.palette.secondary.main,
    },
  }),
);

const LetterAvatar = ({ fullName, className, ...rest }: any) => {
  const classes = useStyles();
  const letter = fullName.toUpperCase()[0];
  const ascii = letter.charCodeAt(0);
  return (
    <Avatar className={`${ascii % 2 === 0 ? classes.pink : classes.purple} ${className}`} {...rest}>
      {letter}
    </Avatar>
  );
};

export default LetterAvatar;
