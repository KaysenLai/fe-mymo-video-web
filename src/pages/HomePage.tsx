import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import baseUrl from '../config/apis';
import VideoCard from '../components/Video/VideoCard';
import { makeStyles } from '@material-ui/core/styles';

import WelcomeImg from '../components/WelcomeImg';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '30px',
  },
}));

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState([]);
  const classes = useStyles();
  const getAll = async () => {
    const res = await axios.get(`${baseUrl}/video`);
    setVideos(res.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <WelcomeImg />
      <Container>
        <div className={classes.root}>
          <Grid container spacing={4}>
            {videos.map((item: any, index: number) => (
              <Grid xs={12} sm={6} md={4} lg={3} item key={item.cover}>
                <VideoCard
                  _id={item._id}
                  avatar={item.author.avatar}
                  followerNum={item.author.followerNum}
                  fullName={item.author.name}
                  key={index}
                  video={item.video}
                  cover={item.cover}
                  authorId={item.author._id}
                  likeNum={item.likeNum}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
