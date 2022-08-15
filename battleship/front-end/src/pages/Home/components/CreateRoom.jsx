import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/Home.css';
import * as io from '../../../io-client-handler'



function GenerateRoom(){
    const [roomID, setroomID] = useState("");
    io.socket.on('send-roomID', (arg1) => {
        setroomID(arg1);
    })

    const handleCopyRoomID = () => {
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

    useEffect(() => {
        document.getElementById("inputRoomID").value = roomID;
    })

    

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

export default function CreateRoom() {
    const [show, setShow] = useState(false);
    
    const handleGenerateRoom = () =>{
        io.socket.emit('generate-roomID');
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div id='call1' className='Homie'>
            <Button className='button-basic1' variant="primary" onClick={handleShow}>
                Create Room
            </Button>

            <Modal
            show={show}
            onHide={handleClose}
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
                    <Button>Join</Button>
                    <Button onClick={ handleGenerateRoom }>Generate Room</Button>
                    <Button variant="secondary" onClick={ handleClose }>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}