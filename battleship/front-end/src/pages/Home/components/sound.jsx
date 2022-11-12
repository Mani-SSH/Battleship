import React,{useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/audio.sass';
import background from "../../../assets/bgm/Home/opbgm.m4a";
import {TbMusic} from "react-icons/tb";
import {TbMusicOff} from "react-icons/tb";

/**
 * @returns background music with button to toggle it on and off for home page
 */
export default function Music()
{
    const [audio] = useState(new Audio(background));    //background music
    const [playing, setPlaying] = useState(false);      //status of music
    const toggle = () => setPlaying(!playing);          //handler for toggling music on and off

    /* set audio to loop */
    audio.loop = true;
    audio.volume = 0.25
    
    /* side effect of 'playing' state being changed */
    useEffect(() => {
        /* change audio to play and pause when 'playing' changes */
        
        playing ? audio.play() : audio.pause();
    },[playing, audio]);

        return(
            <div>
                {playing? <TbMusic className="audi" size='sm' onClick={ toggle }/> : <TbMusicOff className="audi" size='sm' onClick={ toggle }/> }
            </div>
        );

}
