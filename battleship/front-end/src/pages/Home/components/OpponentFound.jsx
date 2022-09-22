import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import * as io from "../../../io-client-handler";

export default function OpponentFound(props){
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
                <ButtonReady />
            </Modal.Body>
        </Modal>
    )
}


function ButtonReady(){
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        io.socket.emit("player-ready");
    }

    return(
        <div>
            { (clicked)? <PlayerReady /> : <Button onClick={ handleClick }>Ready</Button> }
        </div>
    )
}


function PlayerReady(){
    return(
        <div>
            <h1>Player 1: </h1>
            <h1>Player 2: </h1>
        </div>
    )
}
