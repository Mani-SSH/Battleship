import React,{useEffect,useState} from "react";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/audio.sass';
import background from "../../../assets/bgm/Home/background.mp3";

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

    /* side effect of 'playing' state being changed */
    useEffect(() => {
        /* change audion to play and pause when 'playing' changes */
        playing ? audio.play() : audio.pause();
    },[playing, audio]);

        return(
            <div>
                <Button className="audi" size='md' bsPrefix="Home" onClick={ toggle }>{ playing? 'Pause': 'Play' }</Button>
            </div>
        );

}
