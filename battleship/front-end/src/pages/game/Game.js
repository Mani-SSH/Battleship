import "../../../src/assets/css/Game.sass";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Boards from "./components/Boards";
import Actions from "./components/Actions";

export const ClickedXYContext = React.createContext()
export const ClickedXYUpdateContext = React.createContext()
export const ActionContext = React.createContext()

export default function Game()
{
    const location = useLocation()
    const navigate = useNavigate()

    const [clickedXY, setClickedXY] = useState({ x: 0, y: 0 })
    const [action, setAction] = useState()
    const [turn, setTurn] = useState(false)

    useEffect(() => {
        console.log(action)
    }, [action])

    return(
        <div>
            <ClickedXYContext.Provider value={ clickedXY }>
            <ClickedXYUpdateContext.Provider value={ setClickedXY }>
            <ActionContext.Provider value={ action }>
                <Boards turn={ turn }/>
            </ActionContext.Provider>
            </ClickedXYUpdateContext.Provider>
            </ClickedXYContext.Provider>

            <Actions setAction={ setAction } />
        </div>
    );

}
