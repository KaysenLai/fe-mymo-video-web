import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import randomImg from '../assets/randomImgLink';
import { emailErrorText, validateEmail } from '../utils/validation';
import { Link } from 'react-router-dom';
import logo from '../assets/img/MYMO_logo.svg';
import Typography from '@material-ui/core/Typography';
import Loading from '../components/Loading';
import MymoMessage from '../components/MymoMessage';
import axios from 'axios';
import { apiForgetPassword } from '../api/api';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.background.default,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  box: {
    margin: theme.spacing(3, 0),
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(4, 4),
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(4, 4),
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(4, 6),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(4, 8),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: '20px',
  },
  logo: {
    width: '200px',
    marginTop: theme.spacing(2),
  },
  text: {
    marginTop: theme.spacing(3),
    color: theme.palette.grey[300],
    transition: 'color 0.3s ease',
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));

const ForgetPage: React.FC = (props: any) => {
  const classes = useStyles();
  const [randomImgUrl, setRandomImgUrl] = useState('');
  if (randomImgUrl === '') setRandomImgUrl(randomImg());
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const defaultFormData = { value: '', error: false, helperText: '' };
  const [email, setEmail] = useState(defaultFormData);

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (email.value === '') setEmail({ ...email, error: true, helperText: emailErrorText });
    if (email.error) return;
    try {
      setIsLoading(true);
      const res = await axios.get(apiForgetPassword(email.value));
      const msgRes = res.data.message;
      setMsg(msgRes);
      setIsLoading(false);
    } catch (e) {
      setErrMsg(e.response.data.message);
      setIsLoading(false);
    }
  };

  const handleEmailOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    if (validateEmail(inputEmail)) setEmail({ value: inputEmail, error: false, helperText: '' });
    else setEmail({ value: inputEmail, error: true, helperText: emailErrorText });
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Loading isLoading={isLoading} />
        {errMsg !== '' && <MymoMessage msg={errMsg} severity="error" />}
        {msg !== '' && <MymoMessage msg={msg} severity="success" />}
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box className={classes.box}>
            <Link to="/">
              <img className={classes.logo} src={logo} alt="mymo logo" />
            </Link>
            <form className={classes.form} noValidate method="post" onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                value={email.value}
                error={email.error}
                helperText={email.helperText}
                onChange={handleEmailOnchange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                className={classes.button}
              >
                Reset password
              </Button>
            </form>
            <Link to="signin">
              <Typography className={classes.text} variant="body1">
                Go to sign in page
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          lg={8}
          className={classes.image}
          style={{ backgroundImage: `url(${randomImgUrl})` }}
        />
      </Grid>
    </>
  );
};

export default ForgetPage;
