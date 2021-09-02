import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import loadingSvg from '../../assets/img/loading.svg';
import HoverVideoPlayer from 'react-hover-video-player';
import { IProfileVideoCard } from '../../types';
import LikeNumTag from './LikeNumTag';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '340px',
    borderRadius: '6px',
    position: 'relative',
    overflow: 'hidden',
  },
  videoPlayer: {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
    height: '340px',
    '& video': {
      height: 'inherit',
    },
  },
  cover: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
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
}));

const ProfileVideoCard: React.FC<IProfileVideoCard> = (props) => {
  const { _id, cover, video, likeNum } = props;
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
          pausedOverlay={<div className={classes.cover} style={{ backgroundImage: `url(${cover})` }} />}
          loadingOverlay={<img className={classes.loading} src={loadingSvg} alt="loading svg" />}
        />
      </Link>
    </div>
  );
};

export default ProfileVideoCard;
