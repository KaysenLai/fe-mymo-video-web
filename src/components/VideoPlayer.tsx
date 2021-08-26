import { makeStyles, Slider } from "@material-ui/core"
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

const fill = {width: '100%', height: '100%'}
const paddingValue = "30px"

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
    progress: {
        width: "calc(100% - 114px)"
    },
    bottom: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: paddingValue
    },
    right: {
        position: "absolute",
        right: 0,
        height: "100%"
    }
}))

interface VideoCardProps {
    url: string
}

const VideoButton = (label: string, iconUrl: string) => (
    <IconButton aria-label={label} size="medium">
        <img src={iconUrl}/>
    </IconButton>
) 

const VideoPlayer: React.FC<VideoCardProps> = (props) => {
    const {url} = props;
    const classes = useStyles();
    const [pause, setPause] = useState(true);
    const [volume, setVolume] = React.useState<number | number[]>(50);
    let videoRef = useRef<HTMLVideoElement | any>(null);

    // useEffect(() => {
    //     videoRef.current.src = url;
    // }, [])

    const onVideoPress = () => {
        setPause(!pause)
        setTimeout(() => {
            if (pause) {
                videoRef.current.pause();
              } 
              else {
                videoRef.current.play();
              }
        }, 0)
        console.log(pause)
    };

    const handleVolume = (event: any, newValue: any) => {
        setVolume(newValue);
        videoRef.current.volume = newValue / 100
    }
    return (
        <div className={classes.videoBrowse}>
            <video className={classes.video} ref={videoRef} onClick={onVideoPress} controls>
                <source src={url} type="video/mp4" />
            </video>
            <div className={classes.controlContainer} style={{}}>
                <div className={classes.progress}>
                    
                </div>
               
                <VolumeUpIcon/>
                {/* style={{display: pause ? "block" : "none"}}  */}
                <img src={videoPlaySvg}/>
                
                
                
                <img src={returnIcon}/>
                <div className={classes.right}>
                    {VideoButton('next-video', nextIcon)}
                    {VideoButton('last-video', lastIcon)}
                    {VideoButton('like', outlineHeartIcon)}
                    {VideoButton('unlike', filledHeartIcon)}
                    {VideoButton('volume', volumeIcon)}
                    <Slider
                        orientation="vertical"
                        value={volume}
                        aria-labelledby="volume-slider"
                        onChange={handleVolume}
                        max = {100}
                    />
                </div>
                <div className={classes.bottom}>
                    {VideoButton('play', playIcon)}
                    
                    <LinearProgress variant="determinate" value={1} />
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer