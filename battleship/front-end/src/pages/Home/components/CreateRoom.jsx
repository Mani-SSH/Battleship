import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as io from '../../../io-client-handler'
import "../../../assets/css/CreateRoom.sass"


/**
 * @returns Modal when "create room" button is clicked
 */
export default function CreateRoom() {
    const [show, setShow] = useState(false);                   //'show' state of the modal
    const [roomID, setroomID] = useState("");

    const handleCopyRoomID = () => {                                // handler for the event when "copy" button is clicked
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(roomID);

        /* Alert the copied text */
        alert("Copied the text: " + roomID);
    }
    
    
    const handleGenerateRoom = () =>{                          // handler for when "generate room" button is clicked
        /* emit a signal to server to generate a roomID */
        io.socket.emit('generate-roomID', function(roomIDfromServer){
            /* set roomID to arg received from the server */
            setroomID(roomIDfromServer);
        });
    }


    const handleJoin = () => {                                 //handler for when the "join" button is clicked
        /* emit an event to join the room with given roomID */
        io.socket.emit('join-room', roomID);
    }

    /* handles event on "close" button clicked */
    const handleClose = () => setShow(false);

    /* handles event on "create room" button clicked on the home page */
    const handleShow = () => setShow(true);

    /* INCOMPLETE */
    io.socket.on('on-connection-to-room', (msg) => {
        console.log(msg);
    })


    return (
        <div id='call1'>
            <Button className='createRoom' size="lg" bsPrefix="Home" variant="success" onClick={ handleShow }>Create Room</Button>

            <Modal
            show={show}
            onHide={ handleClose }
            size="sm"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Room</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Enter room no."
                    maxLength={6}
                    value={roomID}
                    onChange={ (e) => setroomID(e.target.value) }
                    />
                    <Button variant="outline-secondary" id="button-copy-roomID" onClick={ handleCopyRoomID }>
                    Copy
                    </Button>
                </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={ handleJoin }>Join</Button>
                    <Button onClick={ handleGenerateRoom }>Generate Room</Button>
                    <Button variant="secondary" onClick={ handleClose }>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

