import "../../assets/css/Body.sass";

import React,{ useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import Flex from "./components/flex";
import ShipList from "./components/ShipList";

/**
 * @returns Body page
 */
 export default function Placement() {
    const [goToHome, setgoToHome] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [roomID, setRoomID] = useState("");

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


    useEffect(() => {
        if(goToHome) {
            navigate("/");
        }
    }, [goToHome]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="Body">
            <div className="Header1">
                <h1>Plan Your Ships</h1>
            </div>
            <div className="Header2">
             <h5>RoomID: { roomID }</h5>
            </div>
            <DndProvider backend={ HTML5Backend }>
                <div className="flexie"><Flex /></div>
                <div className="dragie"><ShipList /></div>
            </DndProvider>
            <button className="back" onClick={ () => setgoToHome(true) }>Back</button>
        </div>
    );
 }