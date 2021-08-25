import React, { useEffect, useMemo, useState } from 'react';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { requestIdProfile } from '../../store/actions/profile';
import { State } from '../../types/state';
import ProfileInfo from '../../components/ProfileInfo';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TabBar from '../../components/Tab/TabBar';
import TabPanel from '../../components/Tab/TabPanel';

const useStyles = makeStyles(() => ({
  info: {
    marginTop: '40px',
  },
}));

interface MatchParams {
  userId: string;
}

const tabs = ['Videos', 'Likes'];

const ProfilePage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
  const { match } = props;
  const dispatch = useDispatch();
  const userId = match.params.userId;
  const idProfile = useSelector((state: State) => state.profile.idProfile);
  const { name, avatar, description, followingNum, followerNum, isFollowing, isMyself } = idProfile;
  const classes = useStyles();

  useEffect(() => {
    dispatch(requestIdProfile(userId));
  }, [dispatch, isMyself]);

  const [tabNum, setTabNum] = useState(0);
  const theme = useTheme();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabNum(newValue);
  };

  return (
    <Container>
      <ProfileInfo
        _id={userId}
        className={classes.info}
        fullName={name}
        description={description}
        followingNum={followingNum}
        followerNum={followerNum}
        avatar={avatar}
        isMyProfile={false}
        isFollowing={isFollowing}
      />
      <TabBar tabs={tabs} tabNum={tabNum} handleChange={handleChange} />
      <TabPanel value={tabNum} index={0} dir={theme.direction}>
        Videos
      </TabPanel>
      <TabPanel value={tabNum} index={1} dir={theme.direction}>
        Likes
      </TabPanel>
    </Container>
  );
};

export default ProfilePage;
