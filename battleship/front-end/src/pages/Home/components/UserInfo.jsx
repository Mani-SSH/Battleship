import { useContext, useState, useEffect } from "react"
import { PlayerContext } from "../Home"
import "../../../assets/css/userinfo.sass";
import {useNavigate } from 'react-router-dom';
import { PlayerUpdateContext,LoggedInUpdateContext } from "../Home";
import Player from "../../../player";

export default function UserInfo()
{
    const player = useContext(PlayerContext);
    const [logout, setlogout] = useState(false);
    const setPlayer = useContext(PlayerUpdateContext);
    const setIsLoggedIn = useContext(LoggedInUpdateContext);

    useEffect(() => {
        if(logout) {
            setPlayer(new Player);
            setIsLoggedIn(false);
        }
    }, [logout]) // eslint-disable-line react-hooks/exhaustive-deps
    return(
        <div className="card">
        <div className="card-body">
            <h5 class="card-title">Player Identity</h5>
            <h3>Name: { player.name }</h3>
            <h4>PlayerTag: { player.name.concat("#", player.tag) }</h4>
            <h3>Score: { player.score }</h3>
            <button className="logout" onClick={ () => setlogout(true) }>Logout</button>
        </div>
        </div>
    )
}