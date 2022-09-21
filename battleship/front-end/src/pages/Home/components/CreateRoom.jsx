import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as io from '../../../io-client-handler'
import "../../../assets/css/CreateRoom.sass"
import { useNavigate } from 'react-router-dom';


/**
 * @returns Modal when "create room" button is clicked
 */
export default function CreateRoom() {
    const [showCreateRoom, setShowCreateRoom] = useState(false);               //'show' state of the modal
    const [showJoinRoom, setShowJoinRoom] = useState(false);                   //'show' state of the modal "Joining Room"
    const [roomID, setroomID] = useState("");                                  //id of room                         
    const [join, setJoin] = useState(false);                                   //"join" state given by the server
    const [buttonJoinDisabled, setButtonJoinDisabled] = useState(true);
    const navigate = useNavigate();


    const reset = () => {
        setShowCreateRoom(false);
        setShowJoinRoom(false);
        setroomID("");
        setJoin(false);
    }


    const handleCopyRoomID = () => {                                // handler for the event when "copy" button is clicked
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(roomID);

        /* Alert the copied text */
        alert("Copied the text: " + roomID);
    }
    
    
    const handleGenerateRoom = () =>{                          // handler for when "generate room" button is clicked
        /* emit a signal to server to generate a roomID */
        io.socket.emit('generate-roomID', (roomIDfromServer) => {
            /* set roomID to arg received from the server */
            setroomID(roomIDfromServer);
        });
    }


    const handleJoin = () => {                                 //handler for when the "join" button is clicked
        /* emit an event to join the room with given roomID */
        io.socket.emit('join-room', roomID, (isFound, hasJoined) => {
            if(isFound){
                /* if player has joined */
                if(hasJoined){
                    /* close the modal "create room" */
                    handleCloseCreateRoom();

                    /* open modal "joining room" */
                    setJoin(true);
                }else{
                    /* close modal "joining room" */
                    handleCloseJoinRoom();

                    /* alert the user */
                    alert("The room you are trying to join is full or some error occured.");
                }
            }else{
                alert("The room you are trying to join is expired or does not exist.")
            }
        });
    }


    /* handles event on "close" button clicked */
    const handleCloseCreateRoom = () => setShowCreateRoom(false);

    /* handles event on "create room" button clicked on the home page */
    const handleShowCreateRoom = () => setShowCreateRoom(true);

    /* handles event on "cancel" button clicked */
    const handleCloseJoinRoom = () => setShowJoinRoom(false);

    /* handles event on "join" button clicked on the home page */
    const handleShowJoinRoom = () => setShowJoinRoom(true);

    /* handles event on "cancel" button pressed on the "join room" modal */
    const handleCancel = () => {
        io.socket.emit("leave-room", roomID);
        reset();
    }

    const handleGoToNextPage = () => {
        /* close modal "join room" */
        handleCloseJoinRoom();
        
        /* send signal to enter "ship placement" page */
        navigate("/body");

        /* reset this modal */
        reset();
    }


    io.socket.off("lobby-full").on("lobby-full", () => {
        console.log("Lobby is full. Now starting...");
        handleGoToNextPage();
    })


    useEffect(() => {
        if(roomID.length === 6){
            setButtonJoinDisabled(false);
        }else{
            setButtonJoinDisabled(true);
        }
    }, [roomID])

    useEffect(() => {
        if (join){
            handleShowJoinRoom();
        }
    }, [join])


    return (
        <div id='call1'>
            <Button className='createRoom' size="lg" bsPrefix="Home" variant="success" onClick={ handleShowCreateRoom }>Create Room</Button>

            <Modal
            show={ showCreateRoom }
            onHide={ handleCloseCreateRoom }
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
                    onChange={ (e) => {setroomID(e.target.value)}}
                    />
                    <Button variant="outline-secondary" id="button-copy-roomID" onClick={ handleCopyRoomID }>
                    Copy
                    </Button>
                </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={ handleJoin } disabled={ buttonJoinDisabled }>Join</Button>
                    <Button onClick={ handleGenerateRoom }>Generate Room</Button>
                    <Button variant="secondary" onClick={ handleCloseCreateRoom }>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal
            show={ showJoinRoom }
            onHide={ handleCloseJoinRoom }
            size="sm"
            backdrop="static"
            keyboard="false"
            centered
            >
                <Modal.Header>
                    <Modal.Title>Joining room: { roomID }</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h3>Waiting for opponent...</h3>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleCancel }>Cancel</Button>
                </Modal.Footer>

            </Modal>
        </div>
    );
}