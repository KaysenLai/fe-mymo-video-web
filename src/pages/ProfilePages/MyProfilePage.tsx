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
  const fake = 'https://mymo-avatar.s3.ap-southeast-2.amazonaws.com/89b11bf9-1783-46ab-92c7-a90314e7c8b1.jpg';
  useEffect(() => {
    dispatch(requestMyProfile());
  }, [dispatch]);

  return (
    <>
      <Container>
        <ProfileInfo
          className={classes.info}
          fullName="chaokai lai"
          description="ddd"
          followingNum={0}
          followerNum={0}
          avatar={fake}
        />
      </Container>
    </>
  );
};

export default ProfilePage;
