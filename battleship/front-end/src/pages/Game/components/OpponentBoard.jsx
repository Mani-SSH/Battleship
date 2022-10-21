import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import * as io from "../../../io-client-handler"

import "../../../assets/css/gameBoard.sass";
import EndTurn from "./EndTurn";
import Actions from "./Actions";


const getAdjacentXYs = (x, y, action) => {
    const adjacentXYs = []

    switch(action.id){
        case "missile":
            adjacentXYs.push([x, y])
            break
        case "aerial_strike":
            for(let i = 1; i <= 9; i++){
                adjacentXYs.push([i, y])
            }
            break
        case "cluster_strike":
            for(let i = -1; i <= 1; i++){
                for(let j = -1; j<= 1; j++){
                    adjacentXYs.push([x + i, y + j])
                }
            }
            break
        default:
            console.log("action not chosen")
    }

    return adjacentXYs
}

export default function OpponentBoard({ setTurn, roomID, turn }) {
    const [action, setAction] = useState()

    const [currentXY, setCurrentXY] = useState({x: 0, y: 0}) // coordinates of current cell pointed on board
    const [hoverXYs, setHoverXYs] = useState([]) // coordinates of adjacent cells where ship is placed
    const [hitCoords, setHitCoords] = useState([])
    const [missedCoords, setMissedCoords] = useState([])
    const [destroyedShips, setDestroyedShips] = useState([])

    const [resetHighlight, setResetHighlight] = useState(false) // toggles when mouse in on and off the board, turns off highlight

    const [energyBar, setEnergyBar] = useState(2);  // eneryBar for each strikes
    /**
     * when mouse is off the board, resets highlight, current coordinates and adjacent coordinates
     */
     const handleMouseLeaveBoard = () => {
        setResetHighlight(true)
        setCurrentXY({x:0, y:0})
        setHoverXYs([])
    }

    const handleTileClicked = () => {
        io.socket.emit("player-action", roomID, action.id, currentXY.x, currentXY.y, (isSuccessful, hitCoords, missedCoords, destroyedShips) => {
            /* if action is not successful, alert the user */
            if(!isSuccessful){
                alert("Some error occured")
            }

            /* set hit and missed coords and destroyed ships */
            setHitCoords(hitCoords)
            setMissedCoords(missedCoords)
            setDestroyedShips(destroyedShips)
            console.log("hitCoords: ")
            console.log(hitCoords)
            console.log("missedCoords: ")
            console.log(missedCoords)
            console.log("destroyedShips: ")
            console.log(destroyedShips)

            /* reset action and highlight */
            setAction()
            setResetHighlight(true)
        })
    }

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
                        setXY={ setCurrentXY }
                        hoverXYs={ hoverXYs }
                        resetHighlight={ resetHighlight }
                        onClick={ handleTileClicked }
                        hitCoords={ hitCoords }
                        missedCoords={ missedCoords }
                        action={ action }
                        setEnergyBar = { setEnergyBar }
                        energyBar = {energyBar}
                    />
                );
            }
        }

        return board
    }, [hoverXYs, resetHighlight, hitCoords, missedCoords, action]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleEndTurn = () => {
        setTurn(false)
        setEnergyBar(energyBar => energyBar + 2)
        setAction()
    }

    /* set images of ship */
    useEffect(() => {
        /* check if  is clicked */
        if(action){
            /* check if currentXY is pointing in board */
            if(!(currentXY.x === 0 && currentXY.y === 0)){
                /* get current x and y */
                const { x, y } = currentXY

                /* get array of adjecent cells */
                let adjacentXYs = getAdjacentXYs(x, y, action)

                /* set value of adjacent coordinates on hover */
                setHoverXYs(adjacentXYs)
            }
        }
    }, [action, currentXY])
       
    return(
        <div className="oppBoard">
            <div 
            className="gBoard"
            onMouseLeave={ handleMouseLeaveBoard }
            onMouseEnter={ () => setResetHighlight(false) }
            >
                {board}
            </div>
            <div className="act">
                <Actions 
                setAction={ setAction } 
                energyBar = { energyBar }
                />
            </div>
                <EndTurn onClick={ handleEndTurn }/>
            <div className = "energyBar">
                Energy Bar : {energyBar}
            </div>
        </div>
    );
}

function Square({x, y, setXY, hoverXYs, resetHighlight, onClick, hitCoords, missedCoords, action, setEnergyBar, energyBar }) {
    const [color, setColor] = useState("white")
    const [status, setStatus] = useState("clear")

    const handleHover = () => {
        if(action){
            setXY({ x, y })
        }
    }

    const handleClick = () => {
        if(action){
            onClick()
            if(energyBar > 0)
            {setEnergyBar(prevEnergyBar => prevEnergyBar - action.charge)} // each action will decrease the energy
        else{
            setEnergyBar(0)
        }
        }
    } 

    /* used for highlight */
    useEffect(() => {
        /* for every adjacent coordintes */
        for(let i = 0; i < hoverXYs.length; i++){
            /* if coordinates match */
            if(hoverXYs[i][0] === x && hoverXYs[i][1] === y){
                /* check validity */
                if(status === "clear"){
                    /* highlight green */
                    setColor("green")
                    break
                }else{
                    /* highlight red */
                    setColor("red")
                    break
                }
            }else{
                /* default color */
                setColor("white")
            }
        }
    }, [hoverXYs]) // eslint-disable-line react-hooks/exhaustive-deps

    /* if mouse is off the board, set to default color */
    useEffect(() => {
        if(status === "clear" || status === "miss"){
            if(resetHighlight){
                setColor("white")
            }
        }
    }, [resetHighlight]) // eslint-disable-line react-hooks/exhaustive-deps

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

    const mystyle = {
        backgroundColor:color,
        opacity:1,
        width:50+ 'px',
        height:50+'px',
        border:'1px solid black',
    }

    return(
        <div 
        className="tiles"
        onMouseOver={ handleHover }
        onClick = { handleClick }
        style={mystyle}
        >
        { status }
        <br/>
        { color }
        </div>
    )
}
