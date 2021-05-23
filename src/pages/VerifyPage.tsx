import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import randomImgLink from '../assets/randomImgLink';
import logo from '../assets/img/MYMO_logo.svg';
import axios from 'axios';
import { apiVerifyAccount } from '../api/api';
import Loading from '../components/Loading';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

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
  successIcon: {
    color: '#18d099',
    marginTop: '40px',
    fontSize: '80px',
  },
  errorIcon: {
    color: '#d01852',
    marginTop: '40px',
    fontSize: '80px',
  },
  msg: {
    margin: '20px 0',
    fontSize: '18px',
  },
}));

const VerifyPage: React.FC = (props: any) => {
  const { match } = props;
  const token = match.params.token;
  const classes = useStyles();
  const [randomImgUrl, setRandomImgUrl] = useState('');
  if (randomImgUrl === '') setRandomImgUrl(randomImgLink());

  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    verifyRequest();
  }, []);

  const verifyRequest = async () => {
    try {
      const res = await axios.get(apiVerifyAccount(token));
      const msgRes = res.data.message;
      setMsg(msgRes);
      setIsLoading(false);
    } catch (e) {
      setErrMsg(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box className={classes.box}>
            <Link to="/">
              <img className={classes.logo} src={logo} alt="mymo logo" />
            </Link>
            <Divider variant="middle" className={classes.divider} />
            <Loading isLoading={isLoading} />
            {msg !== '' && (
              <>
                <CheckCircleOutlineIcon className={classes.successIcon} />
                <p className={classes.msg}>{msg}</p>
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
              </>
            )}

            {errMsg !== '' && (
              <>
                <ErrorOutlineIcon className={classes.errorIcon} />
                <p className={classes.msg}>{errMsg}</p>
                <Divider variant="middle" className={classes.divider} />
                <Link to="/signup" className={classes.link}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    color="primary"
                    className={`${classes.button} btn-grey`}
                  >
                    Go to sign up page
                  </Button>
                </Link>
              </>
            )}
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

export default VerifyPage;
