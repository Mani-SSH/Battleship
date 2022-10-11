import { useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { ActionContext } from "../Game";

import "../../../assets/css/gameBoard.sass";

export default function OpponentBoard() {
    const location = useLocation()

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
    useEffect(() => {

    }, [])
       
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

    return(
        <div 
        className="tiles"
        onMouseOver={ handleHover }
        onClick = { handleClick }
        >
        {(bombed)? "bombed" : "clear"}
        <br/>
        {color}
        </div>
    )
}