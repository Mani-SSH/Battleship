import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

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
        console.log("Both players didn't join. Removing from room")
        io.socket.emit("remove-players", roomID);
        onCountdownEnd();
    }

    io.socket.off("oppponent-ready").on("oppponent-ready", () => {
        console.log("Opponent is ready...")
        setOpponentReady(true)
    })

    return(
        <Modal
        show={ show }
        onHide={ onHide }
        size="md"
        backdrop="static"
        keyboard="false"
        centered>
            <Modal.Header>
                <Modal.Title>Opponent Found</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
        <div>
            <h1>{ playerID }  { (playerReady)? <>Ready</> : <Spinner /> }</h1>
            <h1>{ opponentID }    { (opponentReady)? <>Ready</> : <Spinner /> }</h1>
            <h1>{ (playerReady && opponentReady)? <>Starting on <Countdown counter={ 3 } onEnd={ handleGoToNextPage }/>...</>:<></> }</h1>
        </div>
    )
}