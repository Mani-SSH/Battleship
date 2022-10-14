import "../../../src/assets/css/Game.sass";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Boards from "./components/Boards";


export default function Game()
{
    const location = useLocation()
    const navigate = useNavigate()

    
    return(
        <div className="Gamee">
            <Boards roomID={ location.state.roomID }/>
        </div>
    );

}
