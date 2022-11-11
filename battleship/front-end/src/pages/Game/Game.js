import "../../../src/assets/css/Game.sass";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Boards from "./components/Boards";
import * as io from "../../io-client-handler"

export default function Game()
{
    const location = useLocation()
    const navigate = useNavigate()

    io.socket.off("player-forfeit").on("player-forfeit", () => {
        alert("Opponent left the game.")
        navigate("/")
    })

    const onLoad = () => {
        try{
            if(location.state.socketID !== io.socket.id){
                throw console.error("Page reloaded");
            }
        }catch(e){
            navigate("/");
        }
    }

    useEffect(() => {
        onLoad();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    return(
        <div className="body">
            
            <div className="Gamee">
                <Boards roomID={ location.state.roomID }/>
            </div>
        </div>
    );

}
