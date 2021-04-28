import React from 'react';
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import errorImg from '../assets/img/undraw_Notify_re_65on.svg';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '80px',
  },
  img: {
    width: '240px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
  },
}));

const RequestError = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.img} src={errorImg} alt="request error" />
      <p className={classes.text}>Oops...Some errors happened.</p>
    </div>
  );
};

export default RequestError;
