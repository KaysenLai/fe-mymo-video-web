import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import loadingSvg from '../../assets/img/loading.svg';
import HoverVideoPlayer from 'react-hover-video-player';
import { IProfileVideoCard } from '../../types';
import LikeNumTag from './LikeNumTag';
import MymoAvatar from '../MymoAvatar';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '400px',
    borderRadius: '6px',
    position: 'relative',
    overflow: 'hidden',
  },
  videoPlayer: {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    '& video': {
      height: 'inherit',
    },
  },
  cover: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  loading: {
    width: '60px',
    height: '60px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
  likeNum: {
    position: 'absolute',
    zIndex: 10,
    right: '24px',
    top: '18px',
  },
  img: {
    position: 'absolute',
    zIndex: 5,
    bottom: 0,
    width: '100%',
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
    opacity: 0.95,
    backgroundImage:
      'linear-gradient(180deg, rgba(158, 31, 218, 0) 0%, rgba(158, 31, 218, 0.60) 53.99%, rgba(212, 63, 141, 0.80) 100%)',
    '&:hover': {
      height: '80px',
      opacity: 1,
    },
  },
  wrapper: {
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
interface IVideoCard {
  _id: string;
  cover: string;
  video: string;
  likeNum: number;
  avatar: string;
  fullName: string;
  authorId: string;
  followerNum: string;
}
const VideoCard: React.FC<IVideoCard> = (props) => {
  const { _id, cover, video, likeNum, avatar, fullName, followerNum, authorId } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LikeNumTag likeNum={likeNum} className={classes.likeNum} />
      <Link to={`/video/${_id}`}>
        <HoverVideoPlayer
          className={classes.videoPlayer}
          restartOnPaused={false}
          videoSrc={video}
          loop={true}
          unloadVideoOnPaused={true}
          pausedOverlay={<img className={classes.cover} src={cover} alt="cover image" />}
          loadingOverlay={<img className={classes.loading} src={loadingSvg} alt="loading svg" />}
        />
      </Link>
      <div className={classes.img}>
        <div className={classes.authorMask}>
          <div className={classes.author}>
            <Link to={`/profile/${authorId}`} className={classes.wrapper}>
              <MymoAvatar avatarSrc={avatar} fullName={fullName} />
              <div className={classes.textWrapper}>
                <p>{fullName}</p>
                <span>{followerNum} Followers</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
