import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import baseUrl from '../config/apis';
import VideoCard from '../components/Video/VideoCard';
import { makeStyles } from '@material-ui/core/styles';
import Masonry from 'react-masonry-component';
import WelcomeImg from '../components/WelcomeImg';

const useStyles = makeStyles(() => ({
  // root: {
  //   display: 'flex',
  // },
}));
const masonryOptions = {
  transitionDuration: 0,
};
const HomePage: React.FC = () => {
  const [videos, setVideos] = useState([]);
  const classes = useStyles();
  const getAll = async () => {
    const res = await axios.get(`${baseUrl}/video`);
    setVideos(res.data.data);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <WelcomeImg />
      <Container>
        <div>
          <Masonry className="my-gallery-class" options={masonryOptions}>
            {videos.map((item: any, index: number) => (
              <VideoCard
                _id={item._id}
                // avatar={item.author.avatar}
                // coverUrl={item.cover}
                // followerNum={item.author.followerNum}
                // fullName={item.author.name}
                key={index}
                video={item.video}
                cover={item.cover}
                likeNum={item.likeNum}
              />
            ))}
          </Masonry>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
