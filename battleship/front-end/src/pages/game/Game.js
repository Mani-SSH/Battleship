import "../../../src/assets/css/Game.sass";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Boards from "./components/Boards";
import Actions from "./components/Actions";

export default function Game()
{
    const location = useLocation()
    const navigate = useNavigate()
    const [action, setAction] = useState()
    const [turn, setTurn] = useState(false)

    useEffect(() => {
        console.log(action)
    }, [action])

    return(
        <div>
            <Boards turn={ turn }/>
            <Actions setAction={ setAction } />
        </div>
    );

}
