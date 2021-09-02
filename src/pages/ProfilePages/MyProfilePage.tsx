import React, { useEffect, useState } from 'react';
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
import ProfileVideoCard from '../../components/Video/ProfileVideoCard';
import { IProfileVideoCard } from '../../types';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  info: {
    marginTop: '40px',
  },
}));

const tabs = ['videos', 'likes', 'followings', 'followers'];
const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { myProfile, isLoading } = useSelector((state: State) => state.profile);
  const { name, avatar, description, video, likeVideo, follower, following, followingNum, followerNum } = myProfile;
  const classes = useStyles();

  useEffect(() => {
    dispatch(requestMyProfile());
  }, [dispatch]);

  const [tabNum, setTabNum] = useState(0);
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
        <Grid container spacing={4}>
          {video.length ? (
            video.map((item: IProfileVideoCard) => (
              <Grid xs={12} sm={6} md={4} lg={3} item key={item.cover}>
                <ProfileVideoCard _id={item._id} cover={item.cover} video={item.video} likeNum={item.likeNum} />
              </Grid>
            ))
          ) : (
            <span></span>
          )}
        </Grid>
      </TabPanel>
      <TabPanel value={tabNum} index={1} dir={theme.direction}>
        <Grid container spacing={4}>
          {likeVideo.length ? (
            video.map((item: IProfileVideoCard) => (
              <Grid xs={12} sm={6} md={4} lg={3} item key={item.cover}>
                <ProfileVideoCard _id={item._id} cover={item.cover} video={item.video} likeNum={item.likeNum} />
              </Grid>
            ))
          ) : (
            <span></span>
          )}
        </Grid>
      </TabPanel>
      <TabPanel value={tabNum} index={2} dir={theme.direction}>
        {following !== [] &&
          following.map((item: any, index: number) => (
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
