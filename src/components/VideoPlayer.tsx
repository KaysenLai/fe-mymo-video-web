import { Grid, makeStyles, Slider } from "@material-ui/core"
import { LinearProgress } from "@material-ui/core"
import React, { useRef, useState } from "react"
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
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

const fill = {width: '100%', height: '100%'}
const paddingValue = "30px"
const buttonSize = "50px"

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
        right: 0,
        height: "100%"
    },
    buttonChange: {
        position: "relative",
        overflow: "hidden",
        width: buttonSize,
        height: buttonSize   
    },
    playButton: {
        position: "absolute",
        top: "-" + buttonSize
    },
    progress: {
        height: "10px",
        borderRadius: "6px",
        width: "60%"
    },
    hidden: {
        display: "none"
    },
    slider: {
        position: 'absolute',
        bottom: "50px",
        right: "300px"
    }
}))

interface VideoCardProps {
    url: string
}

const VideoButton = (label: string, iconUrl: string, callback: any = () => {}) => (
    <IconButton
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
    let videoRef = useRef<HTMLVideoElement | any>(null);

    useEffect(() => {
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        const buffered = videoRef.current.buffered;
        const width = videoRef.current.width;
        console.log(videoRef.current, duration, currentTime, buffered, width);
    }, [])

    useEffect(() => {
        if (pause) {
            videoRef.current.pause();
        } 
        else {
            videoRef.current.play();
        }
    }, [pause])

    const onVideoPress = () => setPause(!pause)

    const handleVolume = (event: any, newValue: any) => {
        setVolume(newValue);
        videoRef.current.volume = newValue / 100
    }
    return (
        <div className={classes.videoBrowse}>
            <video className={classes.video} ref={videoRef} onClick={onVideoPress}>
                <source src={url} type="video/mp4" />
            </video>
            <div className={classes.controlContainer} style={{}}>
                <p>{pause ? '暂停' : '播放'}</p>
                {/* style={{display: pause ? "block" : "none"}}  */}
                <img src={videoPlaySvg}/>
                <img src={returnIcon}/>
                <div className={classes.right}>
                    {VideoButton('next-video', nextIcon)}
                    {VideoButton('last-video', lastIcon)}
                    {VideoButton('like', outlineHeartIcon)}
                    {VideoButton('unlike', filledHeartIcon)}
                    
                    
                </div>
                <Grid container alignItems="center" className={classes.bottom}>
                    <div className={classes.buttonChange}>
                        <IconButton
                            className={clsx(!pause && classes.playButton)}
                            aria-label='play'
                            size="medium"
                            onClick={() => onVideoPress()}
                        >
                            <img src={playIcon}/>
                        </IconButton>
                        {VideoButton('pause', pauseIcon, onVideoPress)}
                    </div>
                    <LinearProgress className={classes.progress} variant="determinate" value={1} />
                    <Slider
                        className={clsx(volumeHidden && classes.hidden, classes.slider)}
                        orientation="vertical"
                        value={volume}
                        aria-labelledby="volume-slider"
                        onChange={handleVolume}
                        onMouseEnter={() => setVolumeHidden(!volumeHidden)}
                        onMouseLeave={() => setVolumeHidden(!volumeHidden)}
                        max = {100}
                    />
                    <IconButton
                        aria-label='play'
                        size="medium"
                        onMouseEnter={() => setVolumeHidden(false)}
                        onMouseLeave={() => setVolumeHidden(true)}
                    >
                        <img src={volumeIcon}/>
                    </IconButton>
                </Grid>
            </div>
        </div>
    )
}

export default VideoPlayer