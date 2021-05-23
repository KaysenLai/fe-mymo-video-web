import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import baseUrl from '../config/apis';
import VideoCard from '../components/VideoCard';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../assets/theme';

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
    margin: '0 auto',
    maxWidth: '900px',
    display: 'flex',
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
      <Container>
        <div className={classes.root}>
          {videos.map((item: any, index: number) => (
            <VideoCard
              _id={item._id}
              avatar={item.author.avatar}
              coverUrl={item.cover}
              followerNum={item.author.followerNum}
              fullName={item.author.name}
              key={index}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default HomePage;
