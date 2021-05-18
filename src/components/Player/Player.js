import React, { useEffect, useState } from 'react';
import ReactPlayer from "react-player";
import { Grid, Icon, Image, Input, Progress } from 'semantic-ui-react';

import "./Player.scss";

export const Player = ({ songData }) => {
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(0.4)
    const [duration, setDuration] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [totalMinutes, setTotalMinutes] = useState('')

    useEffect(() => {
        if (!songData?.url) return;
        onStart()
        setMinutes(0)
        setSeconds(0)

    }, [songData])

    const onStart = () => {
        setPlaying(true)
    };

    const onPause = () => {
        setPlaying(false)
    };

    const handlerVolume = (event, data) => {
        //Siempre debe ser de tipo number
        setVolume(Number(data.value))
    };

    const onProgress = (data) => {
        let playedSec = data.playedSeconds.toFixed(0)
        playedSec /= 100

        if (seconds < 60) {
            
            setSeconds(prev => prev + 1)
        }
        console.log(seconds);
        if (seconds >= 59 ) {
            setSeconds(0)
            const currentMinutes = minutes + 1
            setMinutes(currentMinutes)
        }
        setPlayedSeconds(data.playedSeconds.toFixed(0))
        setTotalSeconds(data.loadedSeconds)

        const total = `${minutes}:${seconds}`
        setTotalMinutes(total)
    };
    const onDuration = (data) => {
        let duration = data / 60
        duration = duration.toFixed(2)
        if (duration % 1 > .60) {
            let decimal = duration % 1
            let entero = Math.floor(duration)
            entero += 1
            decimal = decimal * 10
            decimal = decimal.toFixed(1) % 1
            decimal = decimal / 10 
            duration = entero + decimal
        }
        setDuration(duration)
    };

    return (
        <div className="player">
            <Grid>
                <Grid.Column width={6} className="left">
                    <Image src={songData?.image} />
                    {songData?.name}
                </Grid.Column>
                <Grid.Column width={6} className="center">
                    <div className="controls">
                        {playing ?
                            (<Icon name="pause" onClick={onPause} />)
                            :
                            (<Icon name="play" onClick={onStart} />)
                        }
                    </div>
                    <div className="bar_time">
                        {totalMinutes? totalMinutes : '0:00'}
                        <Progress
                            progress="value"
                            value={playedSeconds}
                            total={totalSeconds}
                            size="tiny"
                        />
                        {duration? duration.toString().replace('.',':') : '0:00'}
                    </div>
                </Grid.Column>
                <Grid.Column width={4} className="right">
                    <Input
                        label={<Icon name="volume up" />}
                        type="range"
                        max={1}
                        min={0}
                        step={0.01}
                        name="volume"
                        onChange={handlerVolume}
                        value={volume}
                    />
                </Grid.Column>
                <ReactPlayer
                    className="react-player"
                    url={songData?.url}
                    playing={playing}
                    height="0"
                    width="0"
                    volume={volume}
                    onProgress={onProgress}
                    onDuration={onDuration}
                />
            </Grid>
        </div>
    )
}
