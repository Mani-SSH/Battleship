import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button"

import "../../../assets/css/flex.sass";
import { CoordinatesContext, CoordinatesUpdateContext } from "../Placement";

import { Ships, ShipPreview} from "./Ships";

//const xyIntoPosition = (x, y) => ((x - 1) * 10 + (y - 1 * x))

/**
 * 
 * @param {array} coordinates 
 * @returns true if all coordinates are valid, else false
 */
const checkValid = (coordinates) => {
    /* if any coordinate is out of board, return false */
    for(let i = 0; i < coordinates.length; i++){
        if(coordinates[i][0] < 1 || coordinates[i][1] < 1){
            return false
        }
    }

    /* if any coordinate is coincides with coordinates of other ship, return false */


    return true
}

/**
 * @param {number} x 
 * @param {number} y 
 * @param {number} length 
 * @returns array of XYs adjacent to square in (x, y)
 */
const getAdjacentXYs = (x, y, length, rotateShip) => {
    const adjacentXYs = []

    /* for horizontal ship */
    for(let i = 0; i < length; i++){
        switch (rotateShip) {
            case 0:
                adjacentXYs.push([x, y - i])                
                break;
            
            case 1:
                adjacentXYs.push([x + i, y])
                break;

            case 2: 
                adjacentXYs.push([x, y + i])
                break;

            case 3: 
                adjacentXYs.push([x - i, y])
                break;
            case 4: 
                adjacentXYs.push([x, y - i])                
                break;

            default:
                break;
        }
    }

    // console.log(adjacentXYs)
    return adjacentXYs
}

const getFinalTiles = (x, y, length,rotateShip) => {
    const finalTiles = []
    console.log(rotateShip);

    /* for horizontal ship */
    for(let i = 0; i < length; i++){
        switch (rotateShip) {
            case 0:
                finalTiles.push([x, y - i])                
                break;
            
            case 1:
                finalTiles.push([x + i, y])
                break;

            case 2: 
                finalTiles.push([x, y + i])
                break;

            case 3: 
                finalTiles.push([x - i, y])
                break;
            case 4: 
                finalTiles.push([x, y - i])                
                break;

            default:
                break;
        }
    }

    // console.log(adjacentXYs)
    return finalTiles
}

export default function Board()
{
    let board =[];
    
    const [ship, setShip] = useState() // ship clicked

    const [currentXY, setCurrentXY] = useState({x:0, y: 0}) // coordinates of current cell pointed on board
    const [hoverXYs, setHoverXYs] = useState([]) // coordinates of adjacent cells where ship is placed
    const [clickedXY, setClickedXY] = useState({x: 0, y: 0}) // coordinates of clicked cell
    const [shipCordinates, setShipCordinates] = useState([])

    const [rotateShip,setRotation] = useState(0)

    const [valid, setValid] = useState(true) // if the adjacent cells are valid

    const [resetHighlight, setResetHighlight] = useState(false) // toggles when mouse in on and off the board, turns off highlight

    const coordinates = useContext(CoordinatesContext)
    const setCoordinates = useContext(CoordinatesUpdateContext)

    /* setting board */
    for(let j=1; j <= 9; j++)
    {
        for(let i = 1; i <= 9; i++)
        {

            board.push(
                <Square
                x={ j }
                y={ i }
                setXY={ setCurrentXY }
                setClicked = { setClickedXY}
                key={j*10 + i}
                ship={ ship }
                hoverXYs={ hoverXYs }
                resetHighlight={ resetHighlight }
                valid={ valid }
                />
            );
        }
    }

    /**
     * when mouse is off the board, resets highlight, current coordinates and adjacent coordinates
     */
    const handleMouseLeaveBoard = () => {
        setResetHighlight(true)
        setCurrentXY({x:0, y:0})
        setHoverXYs([])
    }

    


    /* REMOVE LATER */
    // useEffect(() => {
    //     console.log(currentXY)
    // }, [currentXY])


    /* on hover while ship is clicked */
    useEffect(() => {
        /* check if ship is clicked */
        if(ship){
            /* check if currentXY is pointing in board */
            if(!(currentXY.x === 0 && currentXY.y === 0)){
                /* get length of ship and current x and y */
                const { length } = ship
                const { x, y } = currentXY

                /* get array of adjecent cells */
                let adjacentXYs = getAdjacentXYs(x, y, length, rotateShip)

                /* check if they are valid and set value of valid to the value returned */
                setValid(checkValid(adjacentXYs))

                /* set value of adjacent coordinates on hover */
                setHoverXYs(adjacentXYs)
            }
        }
    }, [ship, currentXY]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(ship){               // check if the ship is clicked
            if(!(clickedXY.x === 0 && clickedXY.y === 0)){          // it works unless the value of x and y is outside the board
                const { length } = ship                         
                const { x, y } = clickedXY
                let adjacentXYs = getFinalTiles(x, y, length,rotateShip)         // get 3 tiles next from clicked tile
                setShipCordinates(adjacentXYs)                              // problem here

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

            <div
            className="flex-container"
            onMouseLeave={ handleMouseLeaveBoard }
            onMouseEnter={() => setResetHighlight(false)}
            >{board}</div>
        </>
    );
}


function Square({ x, y, setXY, setClicked, ship, hoverXYs, resetHighlight, valid }){
    const [colour, setColour] = useState("white") // color of the cell

    /* when mouse hovers on the cell */
    const handleHover = () => {
        /* if ship is clicked */
        if(ship){
            /* sets value of current xy */
           setXY({x, y})
        }
    }

    const handleClick = () => {
        if (ship){
            setClicked({x,y})
        }
    }

    /* used for highlight */
    useEffect(() => {
        /* for every adjacent coordintes */
        for(let i = 0; i < hoverXYs.length; i++){
            /* if coordinates match */
            if(hoverXYs[i][0] === x && hoverXYs[i][1] === y){
                /* check validity */
                if(valid){
                    /* highlight green */
                    setColour("green")
                    break
                }else{
                    /* highlight red */
                    setColour("red")
                    break
                }
            }else{
                /* default color */
                setColour("white")
            }
        }
    }, [hoverXYs]) // eslint-disable-line react-hooks/exhaustive-deps

    /* if mouse is off the board, set to default color */
    useEffect(() => {
        if(resetHighlight){
            setColour("white")
        }
    }, [resetHighlight])

    return(
        <div
        className="tiles"
        onMouseOver={ handleHover }
        onMouseDown = { handleClick }
        >
            <h6>{colour}</h6>
        </div>
    )
}