import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../../../assets/css/oppfound.sass";
import {CgSearchFound} from "react-icons/cg";
import {AiFillCheckCircle} from "react-icons/ai";

import { useState } from 'react';

import * as io from "../../../io-client-handler";

import Countdown from '../../../features/Countdown';


/**
 * Oppponent found modal
 */
export default function OpponentFound({show, onHide, roomID, playerID, opponentID, handleGoToNextPage, onCountdownEnd}){
    const [ready, setReady] = useState(false);
    const [opponentReady, setOpponentReady] = useState(false);

    const handleReadyClicked = () => {
        setReady(true);
        io.socket.emit("player-ready", roomID);
    }

    const handleOnCountdownEnd = () => {
        alert("Removed from room.\nReason: One or both players didn't join.")
        io.socket.emit("remove-players", roomID);
        onCountdownEnd();
    }

    io.socket.off("oppponent-ready").on("oppponent-ready", () => {
        console.log("Opponent is ready...")
        setOpponentReady(true)
    })

    return(
        <Modal className='of-modal'
        show={ show }
        onHide={ onHide }
        size="sm"
        backdrop="static"
        keyboard="false"
        centered>
            <Modal.Header className='of-header'>
                <Modal.Title className='of-title'>Opponent Found<CgSearchFound /></Modal.Title>
            </Modal.Header>
            <Modal.Body className='of-body'>
                <h3>{!(ready && opponentReady)? <Countdown counter={ 10 } onEnd={ handleOnCountdownEnd } /> : <></> }</h3>
                { 
                    (ready)? 
                    <PlayerReady 
                    playerID={ playerID } 
                    opponentID={ opponentID }
                    playerReady={ ready }
                    opponentReady={ opponentReady }
                    handleGoToNextPage={ handleGoToNextPage }
                    /> :
                    <Button variant='primary' onClick={ handleReadyClicked }>Ready</Button>
                }
            </Modal.Body>
        </Modal>
    )
}


function PlayerReady({playerID, opponentID, playerReady, opponentReady, handleGoToNextPage}){
    return(
        <div className='h1-head'>
            <h1>{ playerID }  { (playerReady)? <><AiFillCheckCircle className='check' /></> : <div className='spinner-border text-success m-0.2' role="status"></div> }</h1>
            <h1>{ opponentID }    { (opponentReady)? <><AiFillCheckCircle className='check' /></> : <div className='spinner-border text-success m-0.2' role="status"></div> }</h1>
            <h2>{ (playerReady && opponentReady)? <>Game starts in <Countdown counter={ 3 } onEnd={ handleGoToNextPage }/>...</>:<></> }</h2>
        </div>
    )
}