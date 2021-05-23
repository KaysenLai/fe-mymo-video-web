import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import baseUrl from '../config/apis';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../assets/theme';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import MymoAvatar from '../components/MymoAvatar';

const useStyles = makeStyles(() => ({
  root: {
    // padding: theme.spacing(2),
    height: 'calc(100vh - 64px)',
    width: '100%',
    display: 'flex',
  },
  videoWrap: {
    flex: 3,
    overflow: 'hidden',
    position: 'relative',
    // backgroundColor: 'wheat',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  commentWrap: {
    flex: 1,
    minWidth: '500px',
    // backgroundColor: 'yellow',
  },
  notFound: {
    fontSize: '40px',
    textAlign: 'center',
    marginTop: '50px',
  },
  img: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    filter: 'blur(20px)',
    position: 'absolute',
  },
  author: {
    width: '100%',
    position: 'absolute',
    bottom: '0',
    padding: '8px 20px',
  },
  authorMask: {
    width: '100%',
    position: 'absolute',
    bottom: '0',
    height: '70px',
    transition: 'all 0.5s ease',
    opacity: 0.8,
    backgroundImage:
      'linear-gradient(180deg, rgba(158, 31, 218, 0) 0%, rgba(158, 31, 218, 0.60) 53.99%, rgba(212, 63, 141, 0.80) 100%)',
  },
  authorWrapper: {
    display: 'flex',
    marginTop: '10px',
  },
  textWrapper: {
    marginLeft: '16px',
    color: 'white',
    '& p': {
      fontWeight: 600,
      fontSize: '16px',
    },
    '& span': {
      fontSize: '12px',
      marginLeft: '2px',
      lineHeight: '10px',
    },
  },
}));

const defaultVideo = {
  cover: '',
  video: '',
  followerNum: 0,
  fullName: '',
  avatar: '',
};

const VideoPage: React.FC = (props: any) => {
  const { match } = props;
  const classes = useStyles();
  const videoId = match.params.videoId;
  const [video, setVideo] = useState(defaultVideo);
  const [found, setFound] = useState(true);

  const getVideo = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/video/${videoId}`);
      if (!data) {
        setFound(false);
        return;
      }
      setVideo(data);
    } catch (e) {
      console.log(e);
      setFound(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <>
      {!found && (
        <Container>
          <p className={classes.notFound}>Video not fount</p>
        </Container>
      )}
      {found && (
        <div className={classes.root}>
          <div className={classes.videoWrap}>
            <video className={classes.video} controls>
              <source src={video.video} type="video/mp4" />
            </video>
            {/*<div className={classes.img} style={{ backgroundImage: `url(${video.cover})` }} />*/}
          </div>
          <div className={classes.commentWrap}>
            <div className={classes.author}>
              <Link to="/signin" className={classes.authorWrapper}>
                <MymoAvatar avatarSrc={video.avatar} fullName={video.fullName} />
                <div className={classes.textWrapper}>
                  <p>{video.fullName}</p>
                  <span>{video.followerNum} Followers</span>
                </div>
              </Link>
            </div>
            <div className={classes.authorMask} />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPage;
