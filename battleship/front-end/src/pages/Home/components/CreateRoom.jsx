import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as io from '../../../io-client-handler'
import "../../../assets/css/CreateRoom.sass"


/**
 * @returns input element for entering roomID and "copy" button
 */
function GenerateRoom(){
    const [roomID, setroomID] = useState("");

    /* listen for an event when the server sends a roomID */
    io.socket.on('send-roomID', (arg) => {
        /* set roomID to arg received from the server */
        setroomID(arg);
    })

    const handleCopyRoomID = () => {                                // handler for the event when "copy" button is clicked
        /* Get the text field */
        var copyText = document.getElementById("inputRoomID");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        /* Alert the copied text */
        alert("Copied the text: " + copyText.value);
    }

    /* side effect of "generate room" button clicked*/
    useEffect(() => {
        /* enter the roomID in the input element */
        document.getElementById("inputRoomID").value = roomID;
    }, [roomID])

    return(
        <InputGroup className="mb-3">
            <Form.Control
            placeholder="Enter room no."
            id="inputRoomID"
            maxLength={6}
            />
            <Button variant="outline-secondary" id="button-copy-roomID" onClick={ handleCopyRoomID }>
            Copy
            </Button>
        </InputGroup>
    )
}

/**
 * @returns Modal when "create room" button is clicked
 */
export default function CreateRoom() {
    const [show, setShow] = useState(false);                   //'show' state of the modal
    
    const handleGenerateRoom = () =>{                          // handler for when "generate room" button is clicked
        /* emit a signal to server to generate a roomID */
        io.socket.emit('generate-roomID');
    }

    const handleJoin = () => {                                 //handler for when the "join" button is clicked
        /* get the roomID from the input element */
        const roomID = document.getElementById("inputRoomID").value;

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
            <Button className='createRoom' size="lg" bsPrefix="Home" variant="success" onClick={handleShow}>Create Room</Button>

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
                    <GenerateRoom />
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

