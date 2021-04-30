import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import { randomInt } from 'node:crypto';
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

interface LetterAvatarProps {
  fullName: string;
  className?: string;
}

const LetterAvatar: React.FC<LetterAvatarProps & React.HTMLAttributes<any>> = (props) => {
  const classes = useStyles();
  const { fullName, className, ...rest } = props;

  const letter = fullName.toUpperCase()[0];

  return (
    <Avatar className={`${classes.purple} ${className}`} {...rest}>
      <p>{letter}</p>
    </Avatar>
  );
};

export default LetterAvatar;
