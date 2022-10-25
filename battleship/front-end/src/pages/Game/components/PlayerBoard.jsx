import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as io from "../../../io-client-handler"

import { ShipList } from "../../../data/shiplist";

import "../../../assets/css/gameBoard.sass";

export default function PlayerBoard() {
    const location = useLocation()
    const [hitCoords, setHitCoords] = useState([])
    const [missedCoords, setMissedCoords] = useState([])
    let shipImg = []

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
                        squareNo = {'squareNo' + j*10 + i}
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


    Object.keys(ShipList).forEach((ship) => {
            //console.log(location.state.coordinates[ShipList[ship].id])
            let x = location.state.coordinates[ShipList[ship].id][0][0]   // x coordinate
            let y = location.state.coordinates[ShipList[ship].id][0][1]     // y coordinate
            let  squareNo = 'squareNo' + x*10 + y                           // equivalent squares
            let squareElement = document.querySelector(`div.${squareNo}`);  //  for the given squares
            let currentTile = squareElement.getBoundingClientRect();
            let rotation = 0;
            console.log(currentTile)
            console.log(squareElement);
            if (ShipList[ship].id !== "corvette")
            {
                let x1 = location.state.coordinates[ShipList[ship].id][1][0]
                let y1 = location.state.coordinates[ShipList[ship].id][1][1]
                if (x === x1)
                {
                    if (y > y1)
                    {
                        rotation = 0
                    }
                    else
                    {
                        rotation = 2
                    }
                }
                else
                {
                    if (x < x1)
                    {
                       rotation = 1
                    }
                    else{
                        rotation = 3
                    }
                }
                //console.log(`The rotation is: ${rotation}`)
            }
            shipImg.push(
                <RenderShip
                    ship = {ShipList[ship]}
                    currentTile = {currentTile}    
                    rotation = {rotation}       
                />
            ) 
        })
    
    
    

    return (
        <div className = "playerBoardContainer">
            <div className="gBoard">
                { board }
            </div>
            <div>
                {shipImg}
            </div>
        </div>

    )
}

function Square({x, y, hitCoords, missedCoords, squareNo}){
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
        className = {squareNo}
        style={mystyle}
        >
        { status }
        </div>
    )
}


function RenderShip({ship, currentTile, rotation}){

    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [rotateClass, setRotateClass] = useState("")

    useEffect(()=>{
        setLeft(((currentTile.left))-((ship.length-1)*50))  // left of the DOMElement
        setTop(currentTile.top)
        switch(rotation){
            case 0:
                setRotateClass("Zero_")
                break
            case 1: 
                setRotateClass("Ninety_")
                break
            case 2: 
                setRotateClass("HundredEighty_")
                break
            case 3: 
                setRotateClass("TwoSeventy_")
                break
            default:  
                console.log("There has been erro in PlayerBoard")
                break
        }
        
    },[ship])

    return(
    <div
     style={ { left, top, position:'absolute'} } className="placeShip">
     <img src={ship.thumb} alt="ships" className={ rotateClass + ship.id} /> 
    </div>);

}