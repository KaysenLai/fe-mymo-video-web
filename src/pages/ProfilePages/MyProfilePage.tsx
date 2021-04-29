import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types/state';
import { makeStyles } from '@material-ui/core/styles';
import ProfileInfo from '../../components/ProfileInfo';
import { requestMyProfile } from '../../store/actions/profile';
import Loading from '../../components/Loading';

const useStyles = makeStyles(() => ({
  info: {
    marginTop: '40px',
  },
}));

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { myProfile, isLoading } = useSelector((state: State) => state.profile);
  const { name, avatar, description, followingNum, followerNum } = myProfile;
  const classes = useStyles();

  useEffect(() => {
    dispatch(requestMyProfile());
  }, [dispatch]);

  return (
    <Container>
      {isLoading && <Loading isLoading />}
      <ProfileInfo
        className={classes.info}
        fullName={name}
        description={description}
        followingNum={followingNum}
        followerNum={followerNum}
        avatar={avatar}
        isMyProfile={true}
      />
    </Container>
  );
};

export default ProfilePage;
