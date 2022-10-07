import React, { useContext, useState } from "react";
import { useDrop } from "react-dnd";

import "../../../assets/css/flex.sass";
import { CoordinatesContext, CoordinatesUpdateContext } from "../Placement";

import Ships from "./Ships";

const addShipToBoard = (ship, x, y) => {
    console.log(`${ship.id} added to ${x}, ${y}`)
}
 
export default function Board()
{
    let board =[];

    const [currentXY, setCurrentXY] = useState({x: 0, y: 0})

    const coordinates = useContext(CoordinatesContext)
    const setCoordinates = useContext(CoordinatesUpdateContext)
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "ship",
        drop: (item, monitor) => {
            const dropped_xy = monitor.getClientOffset()
            console.log(dropped_xy)
            console.log(item)
            console.log(currentXY)
            addShipToBoard(item, currentXY.x, currentXY.y)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    

    const getXY = (x, y) => {
        setCurrentXY({x, y})
    }

    for(let j=1; j <= 9; j++)
    {
        for(let i = 1; i <= 9; i++)
        {

            board.push(
                <Square x={ j } y={ i } getXY={ getXY }/>
            );
        }
    }
    return(
        <>
            <div className="flex-container" ref={ drop }>{board}</div>
            <div className="dragie"><Ships currentXY={ currentXY }/></div>
        </>
    );
}

function Square({ x, y, getXY }){
    const handleHover = () => {
        getXY(x, y)
    }

    return(
        <div className="tiles" key={ x*10 + y } onMouseOver={ handleHover }></div>
    )
}