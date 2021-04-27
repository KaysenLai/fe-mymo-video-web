import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import randomImg from '../assets/randomImg';
import {
  emailErrorText,
  validateEmail,
  passwordEmptyText,
  fNameEmptyText,
  lNameEmptyText,
  confirmEmptyText,
  diffPasswordText,
  passwordLengthErrorText,
  nameSpaceText,
} from '../utils/validation';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import logo from '../assets/img/MYMO_logo.svg';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../types/state';
import Loading from '../components/Loading';
import MymoMessage from '../components/MymoMessage';
import { SignUpInfo } from '../types';
import { requestUserSignUp } from '../store/actions/userSignUp';

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

const SignUpPage: React.FC = (props: any) => {
  const classes = useStyles();
  const { history } = props;
  const [randomImgUrl, setRandomImgUrl] = useState('');
  if (randomImgUrl === '') setRandomImgUrl(randomImg());

  const defaultFormData = { value: '', error: false, helperText: '' };
  const [fName, setFName] = useState(defaultFormData);
  const [lName, setLName] = useState(defaultFormData);
  const [email, setEmail] = useState(defaultFormData);
  const [password, setPassword] = useState(defaultFormData);
  const [confirm, setConfirm] = useState(defaultFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const showIcon = <Visibility style={{ color: '#BCBCBC' }} />;
  const hideIcon = <VisibilityOff style={{ color: '#BCBCBC' }} />;

  const dispatch = useDispatch();
  const userLogin = useSelector((state: State) => state.userLogin);
  const userSignUp = useSelector((state: State) => state.userSignUp);
  const { isAuthenticated, userInfo } = userLogin;
  const { isLoading, errorMessage } = userSignUp;

  useEffect(() => {
    if (isAuthenticated) history.push('/');
  }, [history, userInfo]);

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (fName.value === '') setFName({ ...fName, error: true, helperText: fNameEmptyText });
    if (lName.value === '') setLName({ ...lName, error: true, helperText: lNameEmptyText });
    if (email.value === '') setEmail({ ...email, error: true, helperText: emailErrorText });
    if (password.value === '') setPassword({ ...password, error: true, helperText: passwordEmptyText });
    if (confirm.value === '') setConfirm({ ...confirm, error: true, helperText: confirmEmptyText });

    const callback = () => {
      if (fName.error || lName.error || email.error || password.error || confirm.error) return;
      const signUpInfo: SignUpInfo = {
        name: `${fName.value} ${lName.value}`,
        email: email.value,
        password: password.value,
      };

      dispatch(requestUserSignUp(signUpInfo));
    };
    setTimeout(callback, 200);
  };

  const handleFNameOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFName = e.target.value;
    if (inputFName === '') {
      setFName({ value: inputFName, error: true, helperText: fNameEmptyText });
      return;
    }
    if (inputFName.indexOf(' ') !== -1) {
      setFName({ value: inputFName, error: true, helperText: nameSpaceText });
      return;
    }
    setFName({ value: inputFName, error: false, helperText: '' });
  };

  const handleLNameOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLName = e.target.value;
    if (inputLName === '') {
      setLName({ value: inputLName, error: true, helperText: lNameEmptyText });
    }
    if (inputLName.indexOf(' ') !== -1) {
      setFName({ value: inputLName, error: true, helperText: nameSpaceText });
      return;
    }
    setLName({ value: inputLName, error: false, helperText: '' });
  };

  const handleEmailOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    if (validateEmail(inputEmail)) setEmail({ value: inputEmail, error: false, helperText: '' });
    else setEmail({ value: inputEmail, error: true, helperText: emailErrorText });
  };

  const handlePasswordOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    if (inputPassword === '') {
      setPassword({ value: inputPassword, error: true, helperText: passwordEmptyText });
      return;
    }
    if (inputPassword.length < 8 || inputPassword.length > 30) {
      setPassword({ value: inputPassword, error: true, helperText: passwordLengthErrorText });
      return;
    }
    if (inputPassword === confirm.value) {
      setConfirm({ ...confirm, error: false, helperText: '' });
    } else {
      setConfirm({ ...confirm, error: true, helperText: diffPasswordText });
    }
    setPassword({ value: inputPassword, error: false, helperText: '' });
  };

  const handleConfirmOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputConfirm = e.target.value;
    if (inputConfirm === '') {
      setConfirm({ value: inputConfirm, error: true, helperText: confirmEmptyText });
      return;
    }
    if (inputConfirm.length < 8 || inputConfirm.length > 30) {
      setConfirm({ value: inputConfirm, error: true, helperText: passwordLengthErrorText });
      return;
    }
    if (password.value !== inputConfirm) {
      setConfirm({ value: inputConfirm, error: true, helperText: diffPasswordText });
      return;
    }

    setConfirm({ value: inputConfirm, error: false, helperText: '' });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const handleMouseDownPassword = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      {errorMessage !== '' && <MymoMessage msg={errorMessage} severity="error" />}
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={8} md={6} lg={5}>
          <Box className={classes.box}>
            <Link to="/">
              <img className={classes.logo} src={logo} alt="mymo logo" />
            </Link>
            <form className={classes.form} noValidate method="post" onSubmit={handleSubmit}>
              <Grid container spacing={2} wrap="nowrap">
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    autoComplete="firstname"
                    name="firstname"
                    variant="outlined"
                    fullWidth
                    label="First Name"
                    autoFocus
                    value={fName.value}
                    error={fName.error}
                    helperText={fName.helperText}
                    onChange={handleFNameOnchange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    value={lName.value}
                    error={lName.error}
                    helperText={lName.helperText}
                    onChange={handleLNameOnchange}
                  />
                </Grid>
              </Grid>

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
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password.value}
                error={password.error}
                helperText={password.helperText}
                onChange={handlePasswordOnchange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? showIcon : hideIcon}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="confirm"
                label="Confirm Password"
                type={showConfirm ? 'text' : 'password'}
                value={confirm.value}
                error={confirm.error}
                helperText={confirm.helperText}
                onChange={handleConfirmOnchange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowConfirm}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirm ? showIcon : hideIcon}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                className={classes.button}
              >
                Sign Up
              </Button>
            </form>
            <Link to="signin">
              <Typography className={classes.text} variant="body1">
                Already have an account?
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          lg={7}
          className={classes.image}
          style={{ backgroundImage: `url(${randomImgUrl})` }}
        />
      </Grid>
    </>
  );
};

export default SignUpPage;
