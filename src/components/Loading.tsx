import React from 'react';
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    zIndex: 5,
  },
}));

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  const classes = useStyles();
  return (
    <Backdrop open={isLoading} className={classes.root}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
