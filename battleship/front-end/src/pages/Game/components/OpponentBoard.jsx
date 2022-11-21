import { useEffect, useMemo, useState } from "react";

import * as io from "../../../io-client-handler"

import "../../../assets/css/gameBoard.sass";
import EndTurn from "./EndTurn";
import Actions from "./Actions";

import { ShipList } from "../../../data/shiplist";

import { ActionList } from "../../../data/actionlist";
import flame from "../../../assets/gif/flame.gif";
import radarGif from "../../../assets/gif/radar.gif";
import EnergyIcon from "./energyLevel";
import HitBar from "./hitbar";
import instruction from "../../../assets/images/instruction/instructions.png";

const getAdjacentXYs = (x, y, action) => {
    const adjacentXYs = []

    switch(action.id){
        case ActionList.MISSILE.id:
            adjacentXYs.push([x, y])
            break
        case ActionList.AERIAL_STRIKE.id:
            for(let i = 1; i <= 9; i++){
                adjacentXYs.push([i, y])
            }
            break
        case ActionList.CLUSTER_STRIKE.id:
            for(let i = -1; i <= 1; i++){
                for(let j = -1; j<= 1; j++){
                    adjacentXYs.push([x + i, y + j])
                }
            }
            break
        case ActionList.RADAR.id:
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

    //prepping for the radar action
    const initialRadarText="Waiting for Order"
    const [radarText, setRadarText] =useState(initialRadarText);
    const changeText=(radarHitCount)=>{

        setRadarText(`${radarHitCount} hits registered`)

        const time=setTimeout(()=>{
            setRadarText(initialRadarText)
        },5000)

        return()=>clearTimeout(time);

    };



    /**
     * when mouse is off the board, resets highlight, current coordinates and adjacent coordinates
     */
     const handleMouseLeaveBoard = () => {
        setResetHighlight(true)
        setCurrentXY({x:0, y:0})
        setHoverXYs([])
    }

    const handleTileClicked = () => {
        io.socket.emit("player-action", roomID, action.id, currentXY.x, currentXY.y, (isSuccessful, hitCoords, missedCoords, destroyedShips, radarHitCount) => {
            /* if action is not successful, alert the user */
            if(!isSuccessful){
                alert("Some error occured")
            }


            if( energyBar > 0 ){
                setEnergyBar(prevEnergyBar => prevEnergyBar - action.charge) // each action will decrease the energy
            }else{
                setEnergyBar(0)
            }

            /* if action is radar */
            if (action.id === ActionList.RADAR.id){
                // alert(radarHitCount + " hits registered.")

                //shows the result of using radar action
                //calls the function changeText which sets the state of RadarText
                changeText(radarHitCount);
            
            }else{
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
            }


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
                    />
                );
            }
        }

        return board
    }, [hoverXYs, resetHighlight, hitCoords, missedCoords, action]); // eslint-disable-line react-hooks/exhaustive-deps

    const shipImg = useMemo(() => {
        let shipImg = []

        Object.keys(ShipList).forEach((ship) => {
            shipImg.push(
                <ShipStatus
                    key={ShipList[ship].id}
                    ship = {ShipList[ship]}
                    destroyedShips={ destroyedShips }
                />
            )
        })

        return shipImg
    }, [destroyedShips]) // eslint-disable-line react-hooks/exhaustive-deps

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

    //adds emoji in react
    const Emoji = props => (
        <span
            className="emoji"
            role="img"
            aria-label={props.label ? props.label : ""}
            aria-hidden={props.label ? "false" : "true"}
        >
            {props.symbol}
        </span>
    );
       
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
                <EnergyIcon energy={energyBar} />
            </div>

            <div className="radarCtn">
                <img src={radarGif} alt="radarGif" className="radarGif" />
                <HitBar hit={radarText} />

            </div>

            <div className="ShipStatus">
                <h3 className="fleetH3">Opponent Fleet</h3>
                <div className="shipImg">
                    { shipImg }
                </div>
                
            </div>
            <img src={instruction} alt="instruction" className="instructionPng" />
        </div>
    );
}

function Square({x, y, setXY, hoverXYs, resetHighlight, onClick, hitCoords, missedCoords, action}) {
    const [color, setColor] = useState("")
    const [status, setStatus] = useState("clear")

    const mystyle = {
        backgroundColor:color,
        opacity:1,
        width:50+ 'px',
        height:50+'px',
        border:'1.2px solid black',
    }
    

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
                setColor("")
            }
        }
    }, [hoverXYs]) // eslint-disable-line react-hooks/exhaustive-deps

    /* if mouse is off the board, set to default color */
    useEffect(() => {
        if(resetHighlight){
            setColor("")
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

    return(
        <div 
        className="tiles"
        onMouseOver={ handleHover }
        onClick = { handleClick }
        style={mystyle}
        >
        {
            (status === "hit")?(
                <img src={flame} alt="flame" className="flame" />
            ):(
                (status==="miss")?(
                    <div style={{color:"white", fontSize:"30px"}}>•</div>
                ):(
                    <></>
                )
            )
        }
        </div>
    )
}

function ShipStatus({ship, destroyedShips}){ 
    const [source, setSource] = useState(ship.thumb)
    const [destroyed, setDestroyed] = useState(false)

    useEffect(()=>{
        /* if ship not destroyed */
        if (!destroyed){
            /* for each destroyed ship, check if ship is destroyed */
            for(let i = 0; i < destroyedShips.length; i++){
                if(ship.id === destroyedShips[i]){
                    setSource(ship.dThumb)
                    setDestroyed(true)
                }
            }
        }
    },[destroyedShips]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <div >
        <img src={source} alt="ships" className= "destroyedShips" />
        </div>
    )
}
