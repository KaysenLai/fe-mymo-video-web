import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import randomImgLink from '../assets/randomImgLink';

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

const RandomImg: React.FC = () => {
  const classes = useStyles();
  const [randomImgUrl, setRandomImgUrl] = useState('');
  if (randomImgUrl === '') setRandomImgUrl(randomImgLink());
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={6}
      lg={8}
      className={classes.image}
      style={{ backgroundImage: `url(${randomImgUrl})` }}
    />
  );
};

export default RandomImg;
