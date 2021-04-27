import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import randomImg from '../assets/randomImg';
import { emailErrorText, validateEmail, passwordEmptyText } from '../utils/validation';
import { GoogleOutlined } from '@ant-design/icons';
import { GoogleLogin } from 'react-google-login';
import logo from '../assets/img/MYMO_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  requestGoogleUserLogin,
  requestUserLogin,
  storeUserLoginFail,
  storeUserLoginIsLoading,
} from '../store/actions/userLogin';
import { State } from '../types/state';
import MymoMessage from '../components/MymoMessage';
import Loading from '../components/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  box: {
    margin: theme.spacing(8, 0),
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(8, 4),
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(8, 4),
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(8, 6),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(8, 8),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  button: {
    marginTop: '20px',
  },
  divider: {
    width: '100%',
    marginTop: '20px',
  },
  logo: {
    width: '200px',
  },
  link: {
    width: '100%',
  },
  googleBtnWrap: {
    width: '100%',
  },
}));

const SignInPage: React.FC = (props: any) => {
  const { history, location } = props;
  const classes = useStyles();
  const [randomImgUrl, setRandomImgUrl] = useState('');
  if (randomImgUrl === '') setRandomImgUrl(randomImg());
  const [email, setEmail] = useState({ value: '', error: false, helperText: '' });
  const [password, setPassword] = useState({ value: '', error: false, helperText: '' });
  const googleAuthKey = process.env.REACT_APP_GOOGLE_AUTH || '';
  const dispatch = useDispatch();
  const userLogin = useSelector((state: State) => state.userLogin);
  const { isLoading, errorMessage, userInfo, isAuthenticated } = userLogin;

  useEffect(() => {
    const previousPath = location?.state?.redirect;
    if (!isAuthenticated) return;
    if (previousPath) {
      history.push(previousPath);
    } else {
      history.push('/');
    }
  }, [history, userInfo]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (email.value === '') {
      setEmail({ ...email, error: true, helperText: emailErrorText });
      return;
    }
    if (password.value === '') {
      setPassword({ ...password, error: true, helperText: passwordEmptyText });
      return;
    }

    const callback = () => {
      if (email.error || password.error) return;
      const loginInfo = {
        email: email.value,
        password: password.value,
      };
      dispatch(requestUserLogin(loginInfo));
    };
    setTimeout(callback, 200);
  };

  const handleEmailOnchange = (e: any) => {
    const inputEmail = e.target.value;
    if (validateEmail(inputEmail)) setEmail({ value: inputEmail, error: false, helperText: '' });
    else setEmail({ value: inputEmail, error: true, helperText: emailErrorText });
  };

  const handlePasswordOnchange = (e: any) => {
    const inputPassword = e.target.value;
    if (inputPassword === '') {
      setPassword({ value: inputPassword, error: true, helperText: passwordEmptyText });
    }
    setPassword({ value: inputPassword, error: false, helperText: '' });
  };

  const handleGoogleSuccess = async (res: any) => {
    const profile = res?.profileObj;
    const token = res?.tokenId;
    const { email, name, imageUrl } = profile;
    const googleLogin = { avatar: imageUrl, token, GoogleLoginInfo: { email, name } };
    dispatch(requestGoogleUserLogin(googleLogin));
  };

  const handleGoogleFailure = (error: any) => {
    dispatch(storeUserLoginIsLoading(false));
    console.log(error);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      {errorMessage !== '' && <MymoMessage msg={errorMessage} severity="error" />}
      <Grid container component="main" className={classes.root}>
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
                autoFocus
                value={email.value}
                error={email.error}
                helperText={email.helperText}
                onChange={handleEmailOnchange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password.value}
                error={password.error}
                helperText={password.helperText}
                onChange={handlePasswordOnchange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                className={classes.button}
              >
                Sign In
              </Button>
            </form>
            <Divider variant="middle" className={classes.divider} />
            <GoogleLogin
              clientId={googleAuthKey}
              render={(renderProps) => (
                <div
                  className={classes.googleBtnWrap}
                  onClick={() => {
                    dispatch(storeUserLoginIsLoading(true));
                  }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    color="primary"
                    className={`${classes.button} btn-grey`}
                    startIcon={<GoogleOutlined />}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Sign In with Google
                  </Button>
                </div>
              )}
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              cookiePolicy="single_host_origin"
            />
            <Link to="signup" className={classes.link}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                className={`${classes.button} btn-grey`}
              >
                Create an account
              </Button>
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

export default SignInPage;
