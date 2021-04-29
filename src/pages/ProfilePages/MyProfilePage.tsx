import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types/state';
import { makeStyles } from '@material-ui/core/styles';
import ProfileInfo from '../../components/ProfileInfo';
import { requestMyProfile } from '../../store/actions/profile';

const useStyles = makeStyles(() => ({
  info: {
    marginTop: '40px',
  },
}));

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state: State) => state.userLogin);
  const { userInfo } = userLogin;
  const { avatar, name } = userInfo;
  const classes = useStyles();

  useEffect(() => {
    dispatch(requestMyProfile());
  }, [dispatch]);

  return (
    <>
      <Container>
        <ProfileInfo className={classes.info} />
      </Container>
    </>
  );
};

export default ProfilePage;
