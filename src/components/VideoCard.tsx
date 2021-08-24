import React, {useLayoutEffect, useState} from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MymoAvatar from './MymoAvatar';
import theme from '../assets/theme';
import { Link } from 'react-router-dom';
import { url } from 'inspector';
import MymoMessage from './MymoMessage';
import HoverVideoPlayer from 'react-hover-video-player';
import LoadingSvg from '../assets/img/loading.svg'
import { useRef } from 'react';
import { useEffect } from 'react';
const useStyles = makeStyles(() => ({
  root: {
    width: '32%',
    height: '340px',
    margin: '10px',
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
    '&:hover $authorMask': {
      height: '90px',
      opacity: 1,
    },
  },
  img: {
    position:'relative',
    width: '100%',
    height: '340px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
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
  loading:{
    position: 'absolute',
    top:'30%',
    left:'50%',
    transform:'translate(-50%,-50%)'
  }
}));

interface VideoCardProps {
  _id: string;
  avatar: string;
  fullName: string;
  followerNum: number;
  coverUrl: string;
  videoSrc:string
}

const VideoCard: React.FC<VideoCardProps> = (props) => {
  const [coverImageHeight,setCoverImageHeight] = useState<number | undefined>(0)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const coverImageRef = useRef<HTMLDivElement | null>(null);
  const { _id, avatar, followerNum, fullName, coverUrl } = props;
  const classes = useStyles();
  const style = { backgroundImage: `url(${coverUrl})` };
  useLayoutEffect(() => {
    setCoverImageHeight(document?.querySelector(`.${classes.img}`)?.clientHeight)
  },[props.videoSrc])
  return (
    <div className={classes.root}>
      <Link to={`/video/${_id}`}>
        <HoverVideoPlayer
            videoRef={videoRef}
            restartOnPaused={false}
            videoSrc={props.videoSrc}
            loop = { true }
            videoStyle = { {
              transform: `translate(0,calc((-100% + ${coverImageHeight}px) / 2))`
            } }
            pausedOverlay={
              <div>
                {
                  coverUrl ? (
                      <div ref = {coverImageRef} className={classes.img} style={style}>
                        <div className={classes.authorMask}>
                          <div className={classes.author}>
                            <Link to="/signin" className={classes.wrapper}>
                              <MymoAvatar avatarSrc={avatar} fullName={fullName} />
                              <div className={classes.textWrapper}>
                                <p>{fullName}</p>
                                <span>{followerNum} Followers</span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                  ) : null
                }
              </div>
            }
            loadingOverlay={
              <div className={classes.loading}>
                <img width={"60px"} height={"60px"} src={LoadingSvg}/>
              </div>
            }
        />
      </Link>
    </div>
  );
};

export default VideoCard;
