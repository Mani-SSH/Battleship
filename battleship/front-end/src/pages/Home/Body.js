import "../../assets/css/Body.sass";
import React,{useState} from "react";
import {Navigate} from 'react-router-dom';

/**
 * @returns Body page
 */
 export default function Body() {

    const [goToHome,setgoToHome]= useState(false);

    if(goToHome) {
        return <Navigate to="/" />;
    }

    return (
        <div className="Body">
            <div className="Header1">
                <h1>Plan Your Ships</h1>
            </div>
            <button className="back" onClick={() => {
                setgoToHome(true);
                }}> Back</button>
        </div>
    );
 }