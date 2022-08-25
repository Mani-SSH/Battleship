import React,{useEffect,useState} from "react";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/audio.sass';
import background from "../../../assets/bgm/Home/background.mp3";

export default function Music()
{
    const [audio] = useState(new Audio(background));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },[playing, audio]);

    useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    }
    },[audio]);

        return(
            <div>
                <Button className="audi" size='md' bsPrefix="Home" onClick={toggle}>{playing?'Pause':'Play'}</Button>
            </div>
        );

}