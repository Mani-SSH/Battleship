import "../../assets/css/Body.sass";

import React,{ useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import Board from "./components/Board";
import Countdown from "../../features/Countdown";

import * as io from "../../io-client-handler"
import Button from "react-bootstrap/Button";
import Ships from "./components/Ships";

export const CoordinatesContext = React.createContext()
export const CoordinatesUpdateContext = React.createContext()
export const LockContext = React.createContext()

/**
 * @returns Body page
 */
 export default function Placement() {
    const location = useLocation();
    const navigate = useNavigate();

    const [roomID, setRoomID] = useState("");
    const [lock, setLock] = useState(false);
    const [coordinates, setCoordinates] = useState({
        submarine: [],
        destroyer: [],
        frigate: [],
        corvette: [],
        carrier: []
    })

    const handleGoHome = () => navigate("/")

    const handleCounterEnd = () => {
        /* remove both players from roomID */
        io.socket.emit("remove-players", roomID)

        /* alert the players */
        alert("One or both players did not place all their ships in time.")

        /* go to home page */
        navigate("/")
    }


    const handleReady = () => {
        /* lock any action */
        setLock(true)


        /* emit signal to server */
        io.socket.emit("send-ship-coordinates", coordinates)
    }

    // function onLoad(){
    //     try{
    //         setRoomID(location.state.roomID);
    //     }catch(e){
    //         navigate("/");
    //     }
    // }

    // useEffect(() => {
    //     onLoad();
    // }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="Body">
            <div className="Header1">
                <h1>Plan Your Ships</h1>
            </div>

            <CoordinatesContext.Provider value={ coordinates }>
            <CoordinatesUpdateContext.Provider value={ setCoordinates }>
            <LockContext.Provider value={ lock }>
                <div className="Header2">
                    {/* <h1><Countdown counter={ 90 } onEnd={ handleCounterEnd } /></h1> */}
                </div>

                <div className="flexie"><Board /></div>

                {/* <Button className="back" onClick={ handleGoHome }>Back</Button> */}
                <ButtonReady coordinates={ coordinates } onClick={ handleReady }/>
            </LockContext.Provider>
            </CoordinatesUpdateContext.Provider>
            </CoordinatesContext.Provider>
        </div>
    );
 }


 function ButtonReady({ coordinates, onClick }){
    const lock = useContext(LockContext)

    const [disable, setDisable] = useState(true)

    const handleClicked = () => {
        onClick()
    }

    useEffect(() => {
        if(!lock){
            if(coordinates.carrier.length === 0 || coordinates.corvette.length === 0 || coordinates.destroyer.length === 0 || coordinates.frigate.length === 0 || coordinates.submarine.length === 0){
                setDisable(true)
            }else{
                setDisable(false)
            }
        }else{
            setDisable(true)
        }
    }, [coordinates, lock])

    return(
        <Button className="back" disabled={ disable } onClick={ handleClicked }>Ready</Button>
    )
 }