import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MymoMessage({ msg, severity, ...rest }: any) {
  return (
    <Snackbar open={true} {...rest}>
      <Alert severity="error">{msg}</Alert>
    </Snackbar>
  );
}
