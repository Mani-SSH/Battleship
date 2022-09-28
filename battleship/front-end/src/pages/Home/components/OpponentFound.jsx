import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from 'react';
import * as io from "../../../io-client-handler";

export default function OpponentFound(props){
    const [ready, setReady] = useState(false);
    const [opponentReady, setOpponentReady] = useState(false);

    const reset = () => {
        setReady(false)
        setOpponentReady(false)
    }

    const handleReadyClicked = () => {
        setReady(true);
        io.socket.emit("player-ready", props.roomID);
    }

    io.socket.off("oppponent-ready").on("oppponent-ready", () => {
        console.log("Opponent is ready...")
        setOpponentReady(true)
    })

    /* when both players ready go to next page */
    useEffect(() => {
        if(ready && opponentReady){
            setTimeout(() => {
                props.handleGoToNextPage()
                reset()
            }, 3000);
            
        }
    }, [ready, opponentReady]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <Modal
        show={ props.show }
        onHide={ props.onHide }
        size="md"
        backdrop="static"
        keyboard="false"
        centered>
            <Modal.Header>
                <Modal.Title>Opponent Found</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { 
                    (ready)? 
                    <PlayerReady 
                    playerID={ props.playerID } 
                    opponentID={ props.opponentID }
                    playerReady={ ready }
                    opponentReady={ opponentReady }
                    /> :
                    <Button onClick={ handleReadyClicked }>Ready</Button>
                }
            </Modal.Body>
        </Modal>
    )
}


function PlayerReady(props){
    return(
        <div>
            <h1>{ props.playerID }  { (props.playerReady)? <>Ready</> : <Spinner /> }</h1>
            <h1>{ props.opponentID }    { (props.opponentReady)? <>Ready</> : <Spinner /> }</h1>
        </div>
    )
}
