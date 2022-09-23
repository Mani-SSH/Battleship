import "../../assets/css/Body.sass";
import React,{ useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Flex from "./components/flex";

/**
 * @returns Body page
 */
 export default function Placement() {
    const [goToHome, setgoToHome] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [roomID, setRoomID] = useState("");

    function onLoad(){
        try{
            setRoomID(location.state.roomID);
        }catch(e){
            navigate("/");
        }
    }
    
    useEffect(() => {
        onLoad();
    }, [])


    useEffect(() => {
        if(goToHome) {
            navigate("/");
        }
    }, [goToHome])

    return (
        <div className="Body">
            <div className="Header1">
                <h1>Plan Your Ships</h1>
            </div>
            <div className="Header2">
             <h5>RoomID: { roomID }</h5>
            </div>
            <div className="flexie"><Flex /></div>
            <button className="back" onClick={ () => setgoToHome(true) }>Back</button>
        </div>
    );
 }