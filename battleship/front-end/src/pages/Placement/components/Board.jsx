import React, { useContext, useState } from "react";

import "../../../assets/css/flex.sass";
import { CoordinatesContext, CoordinatesUpdateContext } from "../Placement";

import { Ships, ShipPreview} from "./Ships";

export default function Board()
{
    let board =[];
    

    const [currentXY, setCurrentXY] = useState({x: 0, y: 0})
    const [ship, setShip] = useState()

    const coordinates = useContext(CoordinatesContext)
    const setCoordinates = useContext(CoordinatesUpdateContext)

    const getXY = (x, y) => {
        console.log(x, y);

        /* error */
        setCurrentXY({x, y})

        console.log(currentXY)
    }

    for(let j=1; j <= 9; j++)
    {
        for(let i = 1; i <= 9; i++)
        {

            board.push(
                <Square x={ j } y={ i } getXY={ getXY } key={j*10 + i}/>
            );
        }
    }
    return(
        <>
            <Ships setShip={ setShip }/>
            <ShipPreview ship={ ship }/>
            <div className="flex-container">{board}</div>
            
        </>
    );
}


function Square({ x, y, getXY }){
    const handleHover = () => {
        getXY(x, y)
    }

    return(
        <div className="tiles" key={ x*10 + y } onMouseEnter={ handleHover }></div>
    )
}