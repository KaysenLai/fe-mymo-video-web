import React, { FunctionComponent } from 'react';
import welcomeImg from '../assets/img/welcomeImg.jpg';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles(() => ({
  welcome: {
    width: '100%',
    height: '240px',
  },
  mask: {
    width: '100%',
    height: 'inherit',
    position: 'absolute',
  },
  maskColor: {
    background:
      'linear-gradient(178.71deg, #6500E0 1.03%, rgba(218, 31, 188, 0.5) 59.95%, rgba(212, 63, 141, 0) 98.83%)',
    opacity: 0.5,
    zIndex: 1,
  },
  maskBlack: {
    background: '#000000',
    opacity: 0.3,
    zIndex: 2,
  },
  img: {
    width: '100%',
    height: 'inherit',
    position: 'absolute',
    zIndex: 0,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  container: {
    position: 'relative',
    zIndex: 5,
    height: 'inherit',
    display: 'flex',
    alignItems: 'center',
    '& h2': {
      fontWeight: 'bold',
      fontSize: '40px',
      lineHeight: '54px',
    },
  },
}));

const WelcomeImg: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.welcome}>
      <div className={`${classes.mask} ${classes.maskColor}`} />
      <div className={`${classes.mask} ${classes.maskBlack}`} />
      <div className={classes.img} style={{ backgroundImage: `url(${welcomeImg})` }} />
      <Container className={classes.container}>
        <h2>
          Share your every colourful <br /> moment with MyMo.
        </h2>
      </Container>
    </div>
  );
};

export default WelcomeImg;
