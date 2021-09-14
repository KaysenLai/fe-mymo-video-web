import React, { LegacyRef } from 'react';
import clsx from 'clsx';
import videoPlaySvg from '../assets/img/videoPlay.svg';
import { Link } from 'react-router-dom';
import returnIcon from '../assets/img/videoControl/return.svg';
import { Grid, makeStyles, Slider, withStyles } from '@material-ui/core';
import lastIcon from '../assets/img/videoControl/lastVideo.svg';
import nextIcon from '../assets/img/videoControl/nextVideo.svg';
import outlineHeartIcon from '../assets/img/videoControl/outlineHeart.svg';
import filledHeartIcon from '../assets/img/videoControl/filledHeart.svg';
import IconButton from '@material-ui/core/IconButton';
import playIcon from '../assets/img/videoControl/play.svg';
import pauseIcon from '../assets/img/videoControl/pause.svg';
import volumeIcon from '../assets/img/videoControl/volume.svg';

class VideoPlayer2 extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      timer: null,
      url: props.url,
    };
  }
  componentDidMount = () => {
    console.log('hello');
    this.setState({
      timer: setInterval(() => {
        console.log('ddd');
      }, 5000),
    });

    const duration = this.videoRef.current.duration;
    const currentTime = this.videoRef.current.currentTime;
    const buffered = this.videoRef.current.buffered;
    const width = this.videoRef.current.videoWidth;
    console.log(this.videoRef.current, duration, currentTime, buffered, width);
  };
  componentWillUnmount = () => {
    clearInterval(this.state.timer);
  };

  render() {
    return (
      <video className="video" ref={this.videoRef} loop={true}>
        <source src={this.state.url} type="video/mp4" />
      </video>
    );
    // return <span>123</span>;
    // return     <div className={classes.videoBrowse}>
    //   <video className={classes.video} ref={videoRef} loop={true}>
    //     <source src={url} type="video/mp4" />
    //   </video>
    //   <div className={classes.controlContainer}>
    //     <img
    //       className={clsx(classes.videoPlay, classes.hoverPointer, !pause && classes.hidden)}
    //       src={videoPlaySvg}
    //       onClick={() => onVideoPress()}
    //       alt="play btn"
    //     />
    //     <Link to={'/'}>{VideoButton('return', returnIcon, () => {}, classes.returnButton)}</Link>
    //     <Grid container direction="column" justify="space-between" className={classes.right}>
    //       {VideoButton('last-video', lastIcon)}
    //       {VideoButton('next-video', nextIcon)}
    //       <Grid
    //         container
    //         direction="column"
    //         justify="space-between"
    //         alignItems="center"
    //         className={classes.likeWrapper}
    //       >
    //         <div onClick={() => handleLiked()} className={clsx(classes.heartWrapper, classes.hoverPointer)}>
    //           <img className={clsx(liked && classes.hidden)} src={outlineHeartIcon} />
    //           <img src={filledHeartIcon} />
    //         </div>
    //         <div>{0}</div>
    //       </Grid>
    //     </Grid>
    //     <Grid container alignItems="center" className={classes.bottom}>
    //       <div className={classes.buttonWrapper}>
    //         <IconButton
    //           className={clsx(!pause && classes.hidden)}
    //           aria-label="play"
    //           size="medium"
    //           onClick={() => onVideoPress()}
    //         >
    //           <img src={playIcon} />
    //         </IconButton>
    //         {VideoButton('pause', pauseIcon, onVideoPress)}
    //       </div>
    //       <CustomSlider className={classes.progress} value={progress} max={duration} onChange={handleProgress} />
    //       <Grid
    //         className={clsx(classes.volumeWrapper, !volumeHidden && classes.backgroundDisplay)}
    //         container
    //         direction="column"
    //         justify="flex-end"
    //         alignItems="center"
    //         onMouseLeave={() => setVolumeHidden(true)}
    //       >
    //         <CustomSlider
    //           className={clsx(volumeHidden && classes.hidden, classes.verticalSlider)}
    //           orientation="vertical"
    //           value={volume}
    //           aria-labelledby="volume-slider"
    //           onChange={handleVolume}
    //           max={100}
    //         />
    //         <img className={classes.hoverPointer} src={volumeIcon} onMouseEnter={() => setVolumeHidden(false)} />
    //       </Grid>
    //     </Grid>
    //   </div>
    // </div>;
  }
}
export default VideoPlayer2;
