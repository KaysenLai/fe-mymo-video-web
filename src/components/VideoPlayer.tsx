import { Grid, makeStyles, Slider, withStyles } from "@material-ui/core"
import React, { useRef, useState } from "react"
import clsx from 'clsx'
import videoPlaySvg from '../assets/img/videoPlay.svg'
import IconButton from '@material-ui/core/IconButton'
import playIcon from '../assets/img/videoControl/play.svg'
import volumeIcon from '../assets/img/videoControl/volume.svg'
import nextIcon from '../assets/img/videoControl/nextVideo.svg'
import lastIcon from '../assets/img/videoControl/lastVideo.svg'
import outlineHeartIcon from '../assets/img/videoControl/outlineHeart.svg'
import filledHeartIcon from '../assets/img/videoControl/filledHeart.svg'
import returnIcon from '../assets/img/videoControl/return.svg'
import pauseIcon from '../assets/img/videoControl/pause.svg'
import { useEffect } from "react"
import { Link } from 'react-router-dom';


const fill = {width: '100%', height: '100%'}
const paddingValue = "30px"
const buttonSize = "50px"
enum ButtonStyle {
    background = "rgba(0, 0, 0, 0.3)",
    size = "50px",
    borderRadius = "30px",
    sliderSize = "8px"
}

const useStyles = makeStyles(() => ({
    videoBrowse: {
        ...fill,
        display: 'flex',
        position: 'relative'
    },
    video: {
        height: '100%',
        margin: 'auto',
    },
    controlContainer: {
        position: 'absolute',
        ...fill
    },
    bottom: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: paddingValue,
        backgroundImage: "linear-gradient(180deg,transparent,rgba(0,0,0,.6))"
    },
    right: {
        position: "absolute",
        right: paddingValue,
        top: "50%",
        transform: "translate(0, -50%)",
        width: buttonSize,
        height: "200px"
    },
    buttonWrapper: {
        overflow: "hidden",
        width: buttonSize,
        height: buttonSize   
    },
    progress: {
        height: "10px",
        borderRadius: "6px",
        width: "60%",
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 0)"
    },
    backgroundDisplay: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    volumeWrapper: {
        width: buttonSize,
        position: 'absolute',
        height: "140px",
        borderRadius: "30px",
        right: paddingValue,
        bottom: paddingValue,
        padding: "15px 7px",
    },
    returnButton: {
        position: "absolute",
        left: paddingValue,
        top: paddingValue
    },
    videoPlay: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    },
    likeWrapper: {
        width: buttonSize,
        backgroundColor: ButtonStyle.background,
        borderRadius: ButtonStyle.borderRadius,
        height: "80px",
        padding: "20px 0 10px 0",
    },
    heartWrapper: {
        height: "23px",
        width: "26px",
        overflow: "hidden"
    },
    hoverPointer: {
        "&:hover": {
            cursor: "pointer"
        }
    },
    hidden: {
        display: "none"
    },
    verticalSlider: {
        marginBottom: "10px",
        height: "66% !important",
        width: ButtonStyle.sliderSize + " !important",
        '& .MuiSlider-rail': {
            width: ButtonStyle.sliderSize,
            borderRadius: 4,
          },
        '& .MuiSlider-track': {
            width: ButtonStyle.sliderSize,
            borderRadius: 4,
        }
    }
}))

const CustomSlider = withStyles({
    thumb: {
      height: 19,
      width: 19,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -6,
      marginLeft: -12,
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: ButtonStyle.sliderSize,
      borderRadius: 4,
    },
    rail: {
      height: ButtonStyle.sliderSize,
      borderRadius: 4,
    },
  })(Slider);

interface VideoCardProps {
    url: string
}

const VideoButton = (label: string, iconUrl: string, callback: any = () => {}, className: any=null) => (
    <IconButton
        className={className}
        aria-label={label}
        size="medium"
        onClick={() => callback()}
    >
        <img src={iconUrl}/>
    </IconButton>
) 


const VideoPlayer: React.FC<VideoCardProps> = (props) => {
    const {url} = props;
    const classes = useStyles();
    const [pause, setPause] = useState(true);
    const [volume, setVolume] = React.useState<number | number[]>(50);
    const [volumeHidden, setVolumeHidden] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likedNum, setLikedNum] = useState(1);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    let videoRef = useRef<HTMLVideoElement | any>(null);
    let timer: any;

    useEffect(() => {
        setDuration(videoRef.current.duration);
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        const buffered = videoRef.current.buffered;
        const width = videoRef.current.videoWidth 
        console.log(videoRef.current, duration, currentTime, buffered, width);
    }, [])

    useEffect(() => {
        timer = setInterval(() => {
            if(pause) {
                clearInterval(timer)
            }
                const currentTime = videoRef.current.currentTime;
                setProgress(currentTime)
                console.log(currentTime)
            }, 1000)
        if (pause) {
            videoRef.current.pause();
        } 
        else {
            videoRef.current.play();
            // const timer = setInterval(() => {
            //     const currentTime = videoRef.current.currentTime;
            //     console.log(currentTime)
            // }, 1000)
        }
    }, [pause])

    useEffect(() => 
        liked ? setLikedNum(likedNum + 1) : setLikedNum(likedNum - 1)
    , [liked])

    const onVideoPress = () => {
        setPause(!pause)
    }

    const handleLiked = () => {
        setLiked(!liked);
    } 

    const handleVolume = (event: any, newValue: any) => {
        setVolume(newValue);
        videoRef.current.volume = newValue / 100
    }

    const handleProgress = (event: any, newValue: any) => {
        videoRef.current.timeupdate = newValue
        // videoRef.current.seeking = true;
    }
    return (
        <div className={classes.videoBrowse}>
            <video className={classes.video} ref={videoRef} loop={true}>
                <source src={url} type="video/mp4" />
            </video>
            <div className={classes.controlContainer}>
                <img className={clsx(classes.videoPlay, classes.hoverPointer, !pause && classes.hidden)}
                    src={videoPlaySvg}
                    onClick = {() => onVideoPress()}
                />
                <Link to={"/"}>
                    {VideoButton('return', returnIcon, ()=>{}, classes.returnButton)}
                </Link>
                <Grid container direction="column" justify="space-between" className={classes.right} >
                    {VideoButton('last-video', lastIcon)}
                    {VideoButton('next-video', nextIcon)}
                    <Grid container direction="column" justify="space-between" alignItems="center"
                        className={classes.likeWrapper}
                    >
                        <div onClick={() => handleLiked()}
                            className={clsx(classes.heartWrapper, classes.hoverPointer)}
                        >
                            <img className={clsx(liked && classes.hidden)} src={outlineHeartIcon} />
                            <img src={filledHeartIcon} />
                        </div>
                        <div>{likedNum}</div>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" className={classes.bottom}>
                    <div className={classes.buttonWrapper}>
                        <IconButton
                            className={clsx(!pause && classes.hidden)}
                            aria-label='play'
                            size="medium"
                            onClick={() => onVideoPress()}
                        >
                            <img src={playIcon}/>
                        </IconButton>
                        {VideoButton('pause', pauseIcon, onVideoPress)}
                    </div>
                    <CustomSlider className={classes.progress} value={progress} max={duration} 
                        onChange={handleProgress}
                    />
                    <Grid 
                        className={clsx(classes.volumeWrapper, !volumeHidden && classes.backgroundDisplay)}
                        container direction="column" justify="flex-end" alignItems="center" 
                        onMouseLeave={() => setVolumeHidden(true)}
                    >
                        <CustomSlider
                            className={clsx(volumeHidden && classes.hidden, classes.verticalSlider)}
                            orientation="vertical"
                            value={volume}
                            aria-labelledby="volume-slider"
                            onChange={handleVolume}
                            max = {100}
                        />
                        <img className={classes.hoverPointer} src={volumeIcon} onMouseEnter={() => setVolumeHidden(false)}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default VideoPlayer