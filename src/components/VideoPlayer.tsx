import { makeStyles, Slider } from "@material-ui/core"
import { LinearProgress } from "@material-ui/core"
import React, { useRef, useState } from "react"
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import clsx from 'clsx'
import videoPlaySvg from '../assets/img/videoPlay.svg'
import { useEffect } from "react";

const useStyles = makeStyles(() => ({
    videoBrowse: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    video: {
        height: '100%',
        margin: 'auto',
    },

    progress: {
        width: "100%"
    }
}))

interface VideoCardProps {
    url: string
}
const VideoPlayer: React.FC<VideoCardProps> = (props) => {
    const {url} = props;
    const classes = useStyles();
    const [pause, setPause] = useState(true);
    const [volume, setVolume] = React.useState<number | number[]>(0.5);
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

    const handleVolume = (event: any, newValue: number | number[]) => {
        setVolume(newValue);
        videoRef.current.volume = newValue
        console.log(videoRef.current.volume)
    }
    return (
        <div className={classes.videoBrowse}>
            <video className={classes.video} ref={videoRef} onClick={onVideoPress}>
                <source src={url} type="video/mp4" />
            </video>
            <div className={classes.progress}>
                <LinearProgress variant="determinate" value={1} />
            </div>
            <Slider
                orientation="vertical"
                value={volume}
                aria-labelledby="volume-slider"
                onChange={handleVolume}
                max = {1}
            />
            <VolumeUpIcon/>
            <img style={{display: pause ? "block" : "none"}} src={videoPlaySvg}/>
        </div>
    )
}

export default VideoPlayer