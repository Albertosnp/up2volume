import React, { useState } from 'react';
import ReactPlayer from "react-player";
import { Grid, Icon, Image, Input, Progress } from 'semantic-ui-react';

import "./Player.scss";

export const Player = ({ songData }) => {
    const [playerSeconds, setPlayerSeconds] = useState(200);
    const [totalSeconds, setTotalSeconds] = useState(500);
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(0.3)

    const onStart = () => {
        setPlaying(true)
    };

    const onPause = () => {
        setPlaying(false)
    };

    const handlerVolume = (event, data) => {
        setVolume(data.value)
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
                        value={playerSeconds}
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
            </Grid>           
        </div>
    )
}
