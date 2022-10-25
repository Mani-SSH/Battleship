import "../../assets/css/Body.sass";
import "../../assets/css/board.sass";

import React,{ useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import Board from "./components/Board";

import * as io from "../../io-client-handler"
import Button from "react-bootstrap/Button";
import OpponentStatus from "./components/OpponentStatus";
import background from "../../assets/images/Ships/bg.jpg"

export const CoordinatesContext = React.createContext()
export const CoordinatesUpdateContext = React.createContext()
export const ReadyContext = React.createContext()

/**
 * @returns Body page
 */
 export default function Placement() {
    const location = useLocation();
    const navigate = useNavigate();

    const [roomID, setRoomID] = useState("");
    const [ready, setReady] = useState(false);
    const [opponentReady, setOpponentReady] = useState(false)
    const [coordinates, setCoordinates] = useState({
        submarine: [],
        destroyer: [],
        frigate: [],
        corvette: [],
        carrier: []
    })


    const handleReady = () => {
        /* emit signal to server */
        io.socket.emit("send-ship-coordinates", coordinates, roomID, (isSuccessful) => {
            if (!isSuccessful){
                alert("Some error occured!!!")
            }else{
                /* set ready true */
                setReady(true)
            }
        })
    }

    io.socket.off("opponent-ships-set").on("opponent-ships-set", () => {
        setOpponentReady(true)
    })

    io.socket.off("player-forfeit").on("player-forfeit", () => {
        alert("Opponent left the game.")
        navigate("/")
    })
    

    const onLoad = () => {
        try{
            if(location.state.socketID !== io.socket.id){
                throw console.error("Page reloaded");
            }

            setRoomID(location.state.roomID);
        }catch(e){
            navigate("/");
        }
    }

    useEffect(() => {
        onLoad();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(ready && opponentReady){
            navigate("/game", { 
                state: { 
                    playerID: location.state.playerID,
                    opponentID: location.state.opponentID,
                    roomID: location.state.roomID,
                    socketID: location.state.socketID,
                    coordinates
                },
                replace: true
            })
        }
    }, [ready, opponentReady]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="Body">
            <img src={background} alt="background" className="bg"/>
            <div className="Header1">
                <h1>Plan Your Ships</h1>
                <h3>{ location.state.playerID }'s Board</h3>
            </div>

            <CoordinatesContext.Provider value={ coordinates }>
            <CoordinatesUpdateContext.Provider value={ setCoordinates }>
            <ReadyContext.Provider value={ ready }>
                <div className="secButtons">
                    <OpponentStatus opponentID={ location.state.opponentID } ready={ opponentReady }/>
                    <ButtonReady onClick={ handleReady }/>
                </div>

            <div className="boardContainer"><Board /></div>

            
            </ReadyContext.Provider>
            </CoordinatesUpdateContext.Provider>
            </CoordinatesContext.Provider>
           
        </div>
    );
 }


 function ButtonReady({ onClick }){
    const ready = useContext(ReadyContext)
    const coordinates = useContext(CoordinatesContext)

    const [disable, setDisable] = useState(true)

    const handleClicked = () => {
        onClick()
    }

    useEffect(() => {
        if(!ready){
            if(coordinates.carrier.length === 0 || coordinates.corvette.length === 0 || coordinates.destroyer.length === 0 || coordinates.frigate.length === 0 || coordinates.submarine.length === 0){
                setDisable(true)
            }else{
                setDisable(false)
            }
        }else{
            setDisable(true)
        }
    }, [coordinates, ready])

    return(
        <Button className="readyBtn" disabled={ disable } onClick={ handleClicked }>Ready</Button>
    )
 }