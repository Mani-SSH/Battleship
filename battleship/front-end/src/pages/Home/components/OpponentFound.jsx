import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from 'react';
import * as io from "../../../io-client-handler";

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
                <h3><Countdown counter={ 10 } onEnd={ onCountdownEnd } /></h3>
                { 
                    (ready)? 
                    <PlayerReady 
                    playerID={ playerID } 
                    opponentID={ opponentID }
                    playerReady={ ready }
                    opponentReady={ opponentReady }
                    handleGoToNextPage={ handleGoToNextPage }
                    /> :
                    <Button onClick={ handleReadyClicked }>Ready</Button>
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


function Countdown({counter, onEnd}){
    const [count, setCount] = useState(counter)
    
    useEffect(() => {
        const interval = setInterval(() => setCount(count => count - 1), 1000)
        return () => clearInterval(interval)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(count === 0){
            onEnd();
        }
    }, [count]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>{ count }</>
    )
}
