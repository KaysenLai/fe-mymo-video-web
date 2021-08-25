import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import loadingSvg from '../../assets/img/loading.svg';
import HoverVideoPlayer from 'react-hover-video-player';
import { IProfileVideoCard } from '../../types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '350px',
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
  },
  videoPlayer: {
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center',
    height: '350px',
  },
  loading: {
    width: '60px',
    height: '60px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
}));

const ProfileVideoCard: React.FC<IProfileVideoCard> = (props) => {
  const { _id, cover, video, likeNum } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link to={`/video/${_id}`}>
        <HoverVideoPlayer
          className={classes.videoPlayer}
          restartOnPaused={false}
          videoSrc={props.video}
          loop={true}
          pausedOverlay={<div></div>}
          loadingOverlay={<img className={classes.loading} src={loadingSvg} alt="loading svg" />}
        />
      </Link>
    </div>
  );
};

export default ProfileVideoCard;
