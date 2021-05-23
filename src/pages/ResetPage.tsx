import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import randomImg from '../assets/randomImgLink';
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
import { ResetInfo, SignUpInfo } from '../types';
import { requestUserSignUp } from '../store/actions/userSignUp';
import axios from 'axios';
import { apiForgetPassword, apiResetPassword } from '../api/api';
import Divider from '@material-ui/core/Divider';

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
  divider: {
    width: '100%',
    marginTop: '20px',
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
  link: {
    width: '100%',
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

const ResetPage: React.FC = (props: any) => {
  const classes = useStyles();
  const { match } = props;
  const token = match.params.token;
  const [randomImgUrl, setRandomImgUrl] = useState('');
  if (randomImgUrl === '') setRandomImgUrl(randomImg());

  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const defaultFormData = { value: '', error: false, helperText: '' };

  const [password, setPassword] = useState(defaultFormData);
  const [confirm, setConfirm] = useState(defaultFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const showIcon = <Visibility style={{ color: '#BCBCBC' }} />;
  const hideIcon = <VisibilityOff style={{ color: '#BCBCBC' }} />;

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (password.value === '') setPassword({ ...password, error: true, helperText: passwordEmptyText });
    if (confirm.value === '') setConfirm({ ...confirm, error: true, helperText: confirmEmptyText });
    if (password.error || confirm.error) return;

    const resetInfo: ResetInfo = {
      token,
      password: password.value,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(apiResetPassword(), resetInfo);
      const msgRes = res.data.message;
      setMsg(msgRes);
      setIsLoading(false);
    } catch (e) {
      setErrMsg(e.response.data.message);
      setIsLoading(false);
    }
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
      <Grid container component="main" className={classes.root}>
        <Loading isLoading={isLoading} />
        {errMsg !== '' && <MymoMessage msg={errMsg} severity="error" />}
        {msg !== '' && <MymoMessage msg={msg} severity="success" />}
        <Grid item xs={12} sm={8} md={6} lg={5}>
          <Box className={classes.box}>
            <Link to="/">
              <img className={classes.logo} src={logo} alt="mymo logo" />
            </Link>
            <form className={classes.form} noValidate method="post" onSubmit={handleSubmit}>
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
                Confirm to reset
              </Button>
              <Divider variant="middle" className={classes.divider} />
              <Link to="/signin" className={classes.link}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  color="primary"
                  className={`${classes.button} btn-grey`}
                >
                  Go to sign in page
                </Button>
              </Link>
            </form>
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

export default ResetPage;
