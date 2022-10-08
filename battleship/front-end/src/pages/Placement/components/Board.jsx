import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button"

import "../../../assets/css/flex.sass";
import { CoordinatesContext, CoordinatesUpdateContext } from "../Placement";

import { Ships, ShipPreview} from "./Ships";

//const xyIntoPosition = (x, y) => ((x - 1) * 10 + (y - 1 * x))

export default function Board()
{
    let board =[];
    
    const [currentXY, setCurrentXY] = useState({x: 0, y: 0})
    const [clickedXY, setClickedXY] = useState({x: 0, y: 0})
    const [ship, setShip] = useState()
    const [hoverXYs, setHoverXYs] = useState([])
    const [shipCordinates, setShipCordinates] = useState([])
    const [rotateShip,setRotation] = useState(0)

    const coordinates = useContext(CoordinatesContext)
    const setCoordinates = useContext(CoordinatesUpdateContext)

    for(let j=1; j <= 9; j++)
    {
        for(let i = 1; i <= 9; i++)
        {

            board.push(
                <Square x={ j } y={ i } setXY={ setCurrentXY } setClicked = { setClickedXY} key={j*10 + i} ship={ ship } hoverXYs={ hoverXYs }/>
            );
        }
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} length 
     * @returns array of XYs adjacent to square in (x, y)
     */
    const getAdjacentXYs = (x, y, length) => {
        const adjacentXYs = []

        /* for horizontal ship */
        for(let i = 0; i < length; i++){
            if((y-i)<=0)
            {
                console.log("Out of scope")
                break;
            }
                adjacentXYs.push([x, y - i])
        }

        // console.log(adjacentXYs)
        return adjacentXYs
    }


    /* REMOVE LATER */
    // useEffect(() => {
    //     console.log(currentXY)
    // }, [currentXY])


    /* on hover while ship is clicked */
    useEffect(() => {
        if(ship){
            if(!(currentXY.x === 0 && currentXY.y === 0)){
                const { length } = ship
                const { x, y } = currentXY
                let adjacentXYs = getAdjacentXYs(x, y, length)
                // console.log(adjacentXYs)
                setHoverXYs(adjacentXYs)
                console.log(hoverXYs)
            }
        }
    }, [ship, currentXY])

    useEffect(() => {
        if(ship){
            if(!(clickedXY.x === 0 && clickedXY.y === 0)){
                const { length } = ship
                const { x, y } = clickedXY
                let adjacentXYs = getAdjacentXYs(x, y, length)
                // console.log(adjacentXYs)
                setShipCordinates(adjacentXYs)
                console.log(`The ship is rotated ${rotateShip} times`)
                console.log(`${x},${y} was clicked`)
                console.log(shipCordinates)
            }
        }
    }, [ship, clickedXY])

    


    return(
        <>
            <div className='shipBtnContainer'>
                <div className='shipBtn'>
                    <Ships setShip={ setShip }/>
                </div>
                <div className="shipPreview">
                    <ShipPreview ship={ ship }/>
                </div>
            </div>
            <Button onClick = {()=>{(rotateShip < 4) ? setRotation(rotateShip + 1) : setRotation(0)}}>Rotate</Button>
            <Button>Place Ship</Button>
            <div className="flex-container">{board}</div>
        </>
    );
}


function Square({ x, y, setXY, setClicked, ship, hoverXYs }){
    const [colour, setColour] = useState("white")

    const handleHover = () => {
        if(ship){
         //   setXY({x, y})
        }
    }

    const handleClick = () => {
        if (ship){
            setClicked({x,y})
        }
    }
    useState(() => {
        hoverXYs.forEach(element => {
            if(element[0] === x && element[1] === y){
                setColour("green")
            }
        });
        console.log("changing")
    }, [hoverXYs])

    return(
        <div className="tiles" onMouseEnter={ handleHover } onMouseDown = { handleClick }><h6>{colour}</h6></div>
    )
}