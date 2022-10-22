import "../../../src/assets/css/Game.sass";
import React, { useEffect, useState } from "react";
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
    
    return(
        <div className="Gamee">
            <Boards roomID={ location.state.roomID }/>
        </div>
    );

}
