import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import axios from 'axios';
import baseUrl from '../config/apis';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../assets/theme';
import _ from 'lodash';
import Comment from '../components/Comment';
import { Link } from 'react-router-dom';
import MymoAvatar from '../components/MymoAvatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { authAxios } from '../api/axios';

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
    position: 'relative',
    // backgroundColor: 'yellow',
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
    padding: '10px',
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
      setFound(true);
      console.log(data);
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
          </div>
          <div className={classes.commentWrap}>
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
              <div>{video.description}</div>
              {video.comment.map((item: any, index: number) => (
                <Comment
                  key={index}
                  text={item.text}
                  avatar={item.user.avatar}
                  name={item.user.name}
                  time={item.time}
                />
              ))}
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
