import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { requestIdProfile } from '../../store/actions/profile';
import userEvent from '@testing-library/user-event';
import { State } from '../../types/state';
import Loading from '../../components/Loading';
import ProfileInfo from '../../components/ProfileInfo';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  info: {
    marginTop: '40px',
  },
}));

interface MatchParams {
  userId: string;
}

const ProfilePage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const { match } = props;
  const dispatch = useDispatch();
  const userId = match.params.userId;
  const idProfile = useSelector((state: State) => state.profile.idProfile);
  const { name, avatar, description, followingNum, followerNum } = idProfile;
  const classes = useStyles();

  useEffect(() => {
    dispatch(requestIdProfile(userId));
  }, [dispatch]);

  useEffect(() => {}, []);
  return (
    <Container>
      <ProfileInfo
        className={classes.info}
        fullName={name}
        description={description}
        followingNum={followingNum}
        followerNum={followerNum}
        avatar={avatar}
        isMyProfile={false}
      />
    </Container>
  );
};

export default ProfilePage;
