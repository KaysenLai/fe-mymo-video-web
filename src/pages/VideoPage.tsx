import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import baseUrl from '../config/apis';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../assets/theme';
import _ from 'lodash';
import Comment from '../components/Comment';
import { Link, useHistory } from 'react-router-dom';
import MymoAvatar from '../components/MymoAvatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { authAxios } from '../api/axios';
import VideoPlayer from '../components/VideoPlayer';
import VideoPlayer2 from '../components/VideoPlayer2';
import { useDispatch, useSelector } from 'react-redux';
import nextIcon from '../assets/img/videoControl/nextVideo.svg';
import prevIcon from '../assets/img/videoControl/lastVideo.svg';
import IconButton from '@material-ui/core/IconButton';
import { storeVideoIndex } from '../store/actions/video';

const useStyles = makeStyles(() => ({
  root: {
    height: 'calc(100vh - 64px)',
    width: '100%',
    display: 'flex',
  },
  videoWrap: {
    flex: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  videoBackground: {
    position: 'absolute',
    width: '10%',
    height: '10%',
    filter: 'blur(2px)',
    left: '50%',
    top: '50%',
    transform: 'scale(11)',
    opacity: 0.3,
    zIndex: -1,
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  videoBrowse: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  video: {
    height: '100%',
    margin: 'auto',
  },
  rightWrap: {
    flex: 1,
    minWidth: '500px',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  notFound: {
    fontSize: '40px',
    textAlign: 'center',
    marginTop: '50px',
  },
  img: {
    width: '100%',
    height: '90%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    filter: 'blur(20px)',
    position: 'absolute',
  },
  author: {
    width: '100%',
    position: 'absolute',
    top: '0',
    zIndex: 2,
    padding: '8px 20px',
  },
  authorMask: {
    width: '100%',
    position: 'absolute',
    top: '0',
    height: '70px',
    transition: 'all 0.5s ease',
    opacity: 0.8,
    backgroundImage:
      'linear-gradient(180deg, rgba(212, 63, 141, 0.7) 0%, rgba(158, 31, 218, 0.483) 50.87%, rgba(158, 31, 218, 0) 100%)',
  },
  authorWrapper: {
    display: 'flex',
    marginTop: '10px',
    position: 'relative',
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
  comments: {
    marginTop: '80px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100px',
    '& p': {
      fontSize: '16px',
      marginBottom: '16px',
    },
  },
  commentsWrap: {
    flex: 1,
    padding: '10px 10px 20px 10px',
    overflowY: 'auto',
  },
  prevNextWrap: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    right: '30px',
  },
  prevNextBtn: {
    background: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: ' blur(10px)',
    borderRadius: '30px',
    marginBottom: '10px',
  },
}));

const defaultVideo = {
  cover: '',
  video: '',
  description: '',
  author: {
    _id: '',
    followerNum: 0,
    name: '',
    avatar: '',
  },
  comment: [],
  form: {},
  button: {},
};

const VideoPage: React.FC = (props: any) => {
  const { match } = props;
  const classes = useStyles();
  const videoId = match.params.videoId;
  const [video, setVideo] = useState(defaultVideo);
  const [found, setFound] = useState(false);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await authAxios.put(`${baseUrl}/video/comment`, { text: comment, videoId });
    await getVideo();
  };

  const getVideo = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/video/${videoId}`);
      if (!data) {
        setFound(false);
        return;
      }
      setVideo(data);
      setFound(true);
      if (videoList.length) {
        for (let i = 0; i < videoList.length; i++) {
          if (videoList[i]._id === videoId) {
            dispatch(storeVideoIndex(i));
            break;
          }
        }
      }
    } catch (e) {
      console.log(e);
      setFound(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, [videoId]);

  const videoStore = useSelector((state: any) => state.video);
  const { videoList, videoIndex } = videoStore;

  const handlePrev = () => {
    if (videoIndex === 0) return;
    const prevId = videoList[videoIndex - 1]._id;
    dispatch(storeVideoIndex(videoIndex - 1));
    history.push(`${prevId}`);
  };
  const handleNext = () => {
    if (videoIndex === videoList.length - 1) return;
    const nextId = videoList[videoIndex + 1]._id;
    dispatch(storeVideoIndex(videoIndex + 1));
    history.push(`${nextId}`);
  };

  return (
    <>
      {!found && <Container>{/*<p className={classes.notFound}>//之后换个转圈的loading</p>*/} </Container>}
      {found && (
        <div className={classes.root}>
          <div className={classes.videoWrap}>
            <div className={classes.videoBackground}>
              <img className={classes.backgroundImg} src={`${video.cover}`} alt="video cover" />
            </div>
            <div className={classes.videoBrowse}>
              <video className={classes.video} src={video.video} controls autoPlay />
            </div>
            {videoList.length !== 0 && (
              <div className={classes.prevNextWrap}>
                {videoIndex !== 0 && (
                  <IconButton className={classes.prevNextBtn} size="medium" onClick={() => handlePrev()}>
                    <img src={prevIcon} alt="prevIcon" />
                  </IconButton>
                )}
                {videoIndex !== videoList.length - 1 && (
                  <IconButton className={classes.prevNextBtn} size="medium" onClick={() => handleNext()}>
                    <img src={nextIcon} alt="nextIcon" />
                  </IconButton>
                )}
              </div>
            )}
            {/*<VideoPlayer2 url={video.video} />*/}
          </div>
          <div className={classes.rightWrap}>
            <div className={classes.author}>
              <Link to={`/profile/${video.author._id}`} className={classes.authorWrapper}>
                <MymoAvatar avatarSrc={video.author.avatar} fullName={video.author.name} />
                <div className={classes.textWrapper}>
                  <p>{video.author.name}</p>
                  <span>{video.author.followerNum} Followers</span>
                </div>
              </Link>
            </div>
            <div className={classes.authorMask} />
            <div className={classes.comments}>
              <p>{video.description}</p>
              <div className={classes.commentsWrap}>
                {video.comment.map((item: any, index: number) => (
                  <Comment
                    key={index}
                    text={item.text}
                    avatar={item.user.avatar}
                    name={item.user.name}
                    time={item.time}
                  />
                ))}
              </div>
              <form noValidate method="post" onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Write Comment"
                  name="comment"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e: any) => {
                    setComment(e.target.value);
                  }}
                />

                <Button type="submit" fullWidth variant="contained" size="large" color="primary">
                  Comment
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPage;
