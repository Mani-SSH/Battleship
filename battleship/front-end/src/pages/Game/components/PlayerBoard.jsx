import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as io from "../../../io-client-handler"

import "../../../assets/css/gameBoard.sass";

export default function PlayerBoard() {
    const location = useLocation()
    const [hitCoords, setHitCoords] = useState([])
    const [missedCoords, setMissedCoords] = useState([])

    const board = useMemo(() => {
        let board = []

         /* setting board */
        for(let j=1; j <= 9; j++)
        {
            for(let i = 1; i <= 9; i++)
            {
                board.push(
                    <Square 
                        key={ 10*j + i }
                        x={j}
                        y={i}
                        hitCoords={ hitCoords }
                        missedCoords={ missedCoords }
                    />
                );
            }
        }

        return board
    }, [hitCoords, missedCoords]);

    io.socket.off("opponent-action").on("opponent-action", (hitCoords, missedCoords) => {
        console.log(hitCoords)
        console.log(missedCoords)
        setHitCoords(hitCoords)
        setMissedCoords(missedCoords)
    })

    // useEffect(() => {
    //     location.state.coordinates
    // }, [])

    return (
        <div className="gBoard">
            { board }
        </div>
    )
}

function Square({x, y, hitCoords, missedCoords}) {
    const [color, setColor] = useState("white")
    const [status, setStatus] = useState("clear")

    const mystyle = {
        backgroundColor:color,
        opacity:1,
        width:50+ 'px',
        height:50+'px',
        border:'1px solid black',
    }

    /* if attack missed */
    useEffect(() => {
        if(status === "clear"){
            for(let i = 0; i < missedCoords.length; i++){
                if(missedCoords[i][0] === x && missedCoords[i][1] === y){
                    setStatus("miss")
                }
            }
        }
    }, [missedCoords]) // eslint-disable-line react-hooks/exhaustive-deps

    /* if attack hit */
    useEffect(() => {
        if(status === "clear"){
            for(let i = 0; i < hitCoords.length; i++){
                if(hitCoords[i][0] === x && hitCoords[i][1] === y){
                    setStatus("hit")
                }
            }
        }
    }, [hitCoords]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div 
        className="tiles"
        style={mystyle}
        >
        { status }
        </div>
    )
}