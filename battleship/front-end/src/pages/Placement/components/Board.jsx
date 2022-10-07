import React, { useContext } from "react";
import { useDrop } from "react-dnd";

import "../../../assets/css/flex.sass";
import { CoordinatesContext, CoordinatesUpdateContext } from "../Placement";


const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
 
export default function Board()
{
    let board =[];

    const coordinates = useContext(CoordinatesContext)
    const setCoordinates = useContext(CoordinatesUpdateContext)

    const addShipToBoard = (ship) => {

    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "ship",
        drop: (item, monitor) => {
            const dropped_xy = monitor.getClientOffset()
            console.log(dropped_xy)
            addShipToBoard(item)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }))

    for(let j=verticalAxis.length-1;j>=0;j--)
    {
        for(let i=0;i<horizontalAxis.length;i++)
        {
            board.push(
                <Square />
            );
        }
    }
    return(
        <div className="flex-container" ref={ drop }>{board}</div>
    );
}

function Square(){
    

    return(
        <div className="tiles"></div>
    )
}