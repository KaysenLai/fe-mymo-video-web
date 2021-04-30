import React, { useEffect, useMemo, useState } from 'react';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types/state';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ProfileInfo from '../../components/ProfileInfo';
import { requestMyProfile } from '../../store/actions/profile';
import Loading from '../../components/Loading';
import TabBar from '../../components/Tab/TabBar';
import TabPanel from '../../components/Tab/TabPanel';
import UserCard from '../../components/UserCard';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const useStyles = makeStyles(() => ({
  info: {
    marginTop: '40px',
  },
}));

const tabs = ['videos', 'likes', 'followings', 'followers'];
const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { myProfile, isLoading } = useSelector((state: State) => state.profile);
  const { name, avatar, description, follower, following, followingNum, followerNum } = myProfile;
  const classes = useStyles();
  const query = useQuery();
  const tabName = query.get('tab');

  useEffect(() => {
    dispatch(requestMyProfile());
  }, [dispatch]);

  let tabIndex: number = -1;
  if (tabName === null) {
    history.push(`${url}/?tab=video`);
  } else {
    tabIndex = tabs.indexOf(tabName);
  }

  const [tabNum, setTabNum] = useState(0);
  useMemo(() => {
    setTabNum(tabIndex === -1 ? 0 : tabIndex);
  }, [tabIndex]);
  const theme = useTheme();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabNum(newValue);
  };

  return (
    <Container>
      {isLoading && <Loading isLoading />}
      <ProfileInfo
        _id=""
        className={classes.info}
        fullName={name}
        description={description}
        followingNum={followingNum}
        followerNum={followerNum}
        avatar={avatar}
        isMyProfile={true}
        isFollowing={false}
      />
      <TabBar tabs={tabs} tabNum={tabNum} handleChange={handleChange} />
      <TabPanel value={tabNum} index={0} dir={theme.direction}>
        Videos
      </TabPanel>
      <TabPanel value={tabNum} index={1} dir={theme.direction}>
        Likes
      </TabPanel>
      <TabPanel value={tabNum} index={2} dir={theme.direction}>
        {following !== [] &&
          following.map((item: any, index: any) => (
            <div key={index}>
              <UserCard
                _id={item._id}
                avatar={item.avatar}
                fullName={item.name}
                followerNum={item.followerNum}
                desc={item.description}
              />
            </div>
          ))}
      </TabPanel>
      <TabPanel value={tabNum} index={3} dir={theme.direction}>
        {follower !== [] &&
          follower.map((item: any, index: any) => (
            <div key={index}>
              <UserCard
                _id={item._id}
                avatar={item.avatar}
                fullName={item.name}
                followerNum={item.followerNum}
                desc={item.description}
              />
            </div>
          ))}
      </TabPanel>
    </Container>
  );
};

export default ProfilePage;
