import React, { useContext, useEffect, useState } from "react";

import "../../../assets/css/flex.sass";
import { ShipList } from "../../../data/shiplist";
import { CoordinatesContext, CoordinatesUpdateContext } from "../Placement";

import { Ships, ShipPreview} from "./Ships";

const xyIntoPosition = (x, y) => ((x - 1) * 10 + (y - 1 * x))


export default function Board()
{
    let board =[];
    
    const [currentXY, setCurrentXY] = useState({x: 0, y: 0})
    const [ship, setShip] = useState()

    const coordinates = useContext(CoordinatesContext)
    const setCoordinates = useContext(CoordinatesUpdateContext)

    for(let j=1; j <= 9; j++)
    {
        for(let i = 1; i <= 9; i++)
        {

            board.push(
                <Square x={ j } y={ i } setXY={ setCurrentXY } key={j*10 + i} ship={ ship }/>
            );
        }
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} length 
     * @returns array of squares adjacent to square in (x, y)
     */
    const getAdjacentSquares = (x, y, length) => {
        const squares = []

        /* for horizontal ship */
        for(let i = 0; i < length; i++){
            let position = xyIntoPosition(x, y - i)
            squares.push(board[position])
            console.log(position)
        }

        return squares
    }


    /* REMOVE LATER */
    useEffect(() => {
        console.log(currentXY)
    }, [currentXY])


    /* on hover while ship is clicked */
    useEffect(() => {
        if(ship){
            const { length } = ship
            const { x, y } = currentXY
            const squares = getAdjacentSquares(x, y, length)

            /* add conditions for square to highlight */
        }
    }, [ship, currentXY])

    return(
        <>
            <Ships setShip={ setShip }/>
            <ShipPreview ship={ ship }/>
            <div className="flex-container">{board}</div>
        </>
    );
}


function Square({ x, y, setXY, ship }){
    const handleHover = () => {
        if(ship){
            setXY({x, y})
        }
    }

    return(
        <div className="tiles" key={ x*10 + y } onMouseEnter={ handleHover }></div>
    )
}