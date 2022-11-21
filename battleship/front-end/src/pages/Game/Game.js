import "../../../src/assets/css/Game.sass";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Boards from "./components/Boards";
import * as io from "../../io-client-handler"


export default function Game()
{
    const location = useLocation()
    const navigate = useNavigate()

    const [turn, setTurn] = useState(true)

    io.socket.off("player-forfeit").on("player-forfeit", () => {
        alert("Opponent left the game.")
        navigate("/", { state: {
            socketID: io.socket.id,
            playerID: location.state.playerID,
            password: location.state.password
        }})
    })

    const onLoad = () => {
        try{
            if(location.state.socketID !== io.socket.id){
                throw console.error("Page reloaded");
            }

            io.socket.emit("get-turn", location.state.roomID, (isSuccessful, socketIDofFirst) => {
                if(!isSuccessful){
                    alert("Some error occured!")
                    return
                }
    
                /* if socket id of first turn matches the socket id, set turn true */
                if(io.socket.id === socketIDofFirst){
                    setTurn(true)
                }else{
                    setTurn(false)
                }
            })
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
                <Boards roomID={ location.state.roomID } turn={ turn } setTurn={ setTurn } />
            </div>
            
        </div>
    );

}
