import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import * as io from "../../../io-client-handler";

export default function OpponentFound(props){
    const [clicked, setClicked] = useState(false);

    const handleReadyClicked = () => {
        setClicked(true);
        io.socket.emit("player-ready");
    }

    return(
        <Modal
        show={ props.show }
        onHide={ props.onHide }
        size="sm"
        backdrop="static"
        keyboard="false"
        centered>
            <Modal.Header>
                <Modal.Title>Opponent Found</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { (clicked)? <PlayerReady player1={ props.player1 } player2={ props.player2 }/> : <Button onClick={ handleReadyClicked }>Ready</Button> }
            </Modal.Body>
        </Modal>
    )
}


function PlayerReady(props){
    const player1 = {
        id: props.player1,
        
    }
    return(
        <div>
            <h1>Player 1: </h1>
            <h1>Player 2: </h1>
        </div>
    )
}
