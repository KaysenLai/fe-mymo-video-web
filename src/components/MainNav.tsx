import React, { useMemo } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GhostButton from './GhostButton';
import logo from '../assets/img/MYMO_logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../types/state';
import { storeUserLogout } from '../store/actions/userLogin';
import { useHistory, useLocation } from 'react-router-dom';
import MymoAvatar from './MymoAvatar';
import { Tabs } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import {SearchAutoComplete} from "./SearchAutoComplete";

const useStyles = makeStyles((theme) => ({
  mainNav: {
    backgroundColor: theme.palette.background.default,
  },
  button: {
    marginRight: theme.spacing(2),
  },
  logo: {
    width: '90px',
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '30px',
    height: '30px',
    fontSize: '20px',
  },
  userName: {
    fontSize: '18px',
    color: 'white',
  },
  navTab: {
    height: '64px',
    fontSize: '16px',
  },
}));

const MainNav = () => {
  const classes = useStyles();
  const userLogin = useSelector((state: State) => state.userLogin);

  const { isAuthenticated } = userLogin;

  return (
    <AppBar position="relative" className={classes.mainNav}>
      <Toolbar>
        <Container>
          <Grid container alignItems="center" justify="space-between">
            <Grid item className={classes.logoWrap}>
              <Link to="/">
                <img className={classes.logo} src={logo} alt="mymo logo" />
              </Link>
            </Grid>
            <Grid item>
             <SearchAutoComplete/>
            </Grid>
            <Grid item>
              {isAuthenticated && <LogoutButtons />}
              {!isAuthenticated && <LoginButtons />}
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

const LogoutButtons: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const myProfile = useSelector((state: State) => state.profile.myProfile);
  const { name, avatar } = myProfile;

  const handleLogout = () => {
    dispatch(storeUserLogout());
    history.push('/');
  };

  return (
    <>
      <Grid container justify="center" alignItems="center" spacing={6}>
        <Link to="/profile">
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item>
              <MymoAvatar avatarSrc={avatar} fullName={name} className={classes.avatar} />
            </Grid>
            <Grid item>
              <span className={classes.userName}>{name}</span>
            </Grid>
          </Grid>
        </Link>

        <Grid item>
          <GhostButton size="small" onClick={handleLogout}>
            Log out
          </GhostButton>
        </Grid>
      </Grid>
    </>
  );
};

const LoginButtons: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Link to="/signin">
        <GhostButton className={classes.button} size="small">
          Sign In
        </GhostButton>
      </Link>
      <Link to="/signup">
        <GhostButton size="small">Sign Up</GhostButton>
      </Link>
    </>
  );
};

export default MainNav;
