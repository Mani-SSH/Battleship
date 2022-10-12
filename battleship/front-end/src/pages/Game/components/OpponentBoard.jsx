import { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { ActionContext } from "../Game";

import "../../../assets/css/gameBoard.sass";

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

export default function OpponentBoard() {
    const location = useLocation()
    const action = useContext(ActionContext)

    const [currentXY, setCurrentXY] = useState({x:0, y: 0}) // coordinates of current cell pointed on board
    const [hoverXYs, setHoverXYs] = useState([]) // coordinates of adjacent cells where ship is placed

    const [resetHighlight, setResetHighlight] = useState(false) // toggles when mouse in on and off the board, turns off highlight

    /**
     * when mouse is off the board, resets highlight, current coordinates and adjacent coordinates
     */
     const handleMouseLeaveBoard = () => {
        setResetHighlight(true)
        setCurrentXY({x:0, y:0})
        setHoverXYs([])
    }

    let board =[];
    
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
                />
            );
        }
    }

    /* set images of ship */
    // useEffect(() => {

    // }, [])

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
        <>
            <div 
            className="gBoard"
            onMouseLeave={ handleMouseLeaveBoard }
            onMouseEnter={() => setResetHighlight(false)}
            >
            {board}
            </div>
        </>
    );
}

function Square({x, y, setXY, hoverXYs, resetHighlight, onClick }) {
    const [color, setColor] = useState("white")
    const [bombed, setBombed] = useState(false)
    const action = useContext(ActionContext)

    const handleHover = () => {
        if(action){
            setXY({ x, y })
        }
    }

    const handleClick = () => {
        if(action){
            onClick()
        }
    } 

    /* used for highlight */
    useEffect(() => {
        /* for every adjacent coordintes */
        for(let i = 0; i < hoverXYs.length; i++){
            /* if coordinates match */
            if(hoverXYs[i][0] === x && hoverXYs[i][1] === y){
                /* check validity */
                if(!bombed){
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
        if(!bombed){
            if(resetHighlight){
                setColor("white")
            }
        }
    }, [resetHighlight])

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
        {(bombed)? "bombed" : "clear"}
        <br/>
        {color}
        </div>
    )
}