import React, { useEffect, useState } from 'react';
import ReactPlayer from "react-player";
import { Grid, Icon, Image, Input, Progress } from 'semantic-ui-react';

import "./Player.scss";

export const Player = ({ songData }) => {
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(0.3)
    
    useEffect(() => {
        if (!songData?.url) return;
        onStart()

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
        setPlayedSeconds(data.playedSeconds)
        setTotalSeconds(data.loaderSeconds)
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
                        {playing? 
                        ( <Icon name="pause" onClick={onPause} /> )
                        :
                        ( <Icon name="play" onClick={onStart} /> )
                        }
                    </div>
                    <Progress 
                        progress="value"
                        value={playedSeconds}
                        total={totalSeconds}  
                        size="tiny"

                    />
                </Grid.Column>
                <Grid.Column width={4} className="right">
                    <Input 
                        label={<Icon name="volume up"/>}
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
                />
            </Grid>           
        </div>
    )
}
