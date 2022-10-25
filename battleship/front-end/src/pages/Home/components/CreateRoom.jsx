import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

import JoinRoom from './JoinRoom';
import OpponentFound from './OpponentFound';

import * as io from '../../../io-client-handler'

import "../../../assets/css/CreateRoom.sass"
import "../../../assets/css/Home.sass";
import { LoggedInContext, PlayerContext } from '../Home';


/**
 * @returns Modal when "create room" button is clicked
 */
export default function CreateRoom() {
    const [showCreateRoom, setShowCreateRoom] = useState(false);               //'show' state of the modal
    const [showJoinRoom, setShowJoinRoom] = useState(false);                   //'show' state of the modal "Joining Room"
    const [showOpponentFound, setShowOpponentFound] = useState(false);         //"show" state of the modal "Opponent Found"
    const [roomID, setroomID] = useState("");                                  //id of room                         
    const [join, setJoin] = useState(false);                                   //"join" state given by the server
    const [opponentID, setOpponentID] = useState("");                          //id of opponent
    const [playerID, setPlayerID] = useState("");
    const navigate = useNavigate();

    const isLoggedIn = useContext(LoggedInContext)
    const player = useContext(PlayerContext)

    /* resets the modal */
    const reset = () => {
        setShowCreateRoom(false);
        setShowJoinRoom(false);
        setroomID("");
        setJoin(false);
        setShowOpponentFound(false);
    }
    
    const handleGenerateRoom = () =>{                          // handler for when "generate room" button is clicked
        /* emit a signal to server to generate a roomID */
        io.socket.emit('generate-roomID', (roomIDfromServer) => {
            /* set roomID to arg received from the server */
            setroomID(roomIDfromServer);
        });
    }


    const handleJoin = () => {                                 //handler for when the "join" button is clicked
        setPlayerID(player.id)

        /* emit an event to join the room with given roomID */
        io.socket.emit('join-room', roomID, playerID, (isFound, hasJoined) => {
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

    const handleShowOpponentFound = () => setShowOpponentFound(true);

    const handleCloseOpponentFound = () => setShowOpponentFound(false);

    /* handles event on "cancel" button pressed on the "join room" modal */
    const handleCancel = () => {
        io.socket.emit("leave-room", roomID);
        reset();
    }


    /* handles event to go to next page */
    const handleGoToNextPage = () => {
        /* close modal "join room" */
        handleCloseJoinRoom();
        
        /* send signal to enter "ship placement" page with roomID*/
        navigate("/placement", { 
            state: {
                roomID, 
                playerID, 
                opponentID, 
                socketID: io.socket.id 
            },
            replace: true 
        });

        /* reset this modal */
        reset();
    }


    /* if "lobby-full" signal received from server, go to next page */
    io.socket.off("lobby-full").on("lobby-full", () => {
        console.log("Lobby is full. Now starting...");

        io.socket.emit("get-opponentID", roomID, (isSuccessful, playerID, opponentID) => {
            if(!isSuccessful) {
                alert("Error: Could not receive opponent's playerID")
                return
            }

            setPlayerID(playerID);
            setOpponentID(opponentID);
        });

        /* close modal "Join Room" */
        handleCloseJoinRoom();

        /* show modal "Opponent Found" */
        handleShowOpponentFound();
    })

    /* if player logs in change player */
    useEffect(() => {
        if(isLoggedIn){
            setPlayerID(player.id)
        }
    }, [isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

    /* shows join room */
    useEffect(() => {
        if (join){
            handleShowJoinRoom();
        }
    }, [join])


    return (
        <div id='call1'>
            <Button className='createRoom' size="lg" bsPrefix='Home' variant="success" onClick={ handleShowCreateRoom }>Create Room</Button>

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
                    onChange={ (e) => { setroomID(e.target.value) } }
                    />
                    <ButtonCopy roomID={ roomID } />
                </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <ButtonJoin
                    roomID={ roomID }
                    onClick={ handleJoin }
                    />
                    <Button onClick={ handleGenerateRoom }>Generate Room</Button>
                    <Button variant="secondary" onClick={ handleCloseCreateRoom }>Close</Button>
                </Modal.Footer>
            </Modal>

            <JoinRoom
            isCustom={ true }
            show={ showJoinRoom }
            roomID={ roomID }
            onHide={ handleCloseJoinRoom }
            onCancel={ handleCancel }
            />

            <OpponentFound
            show={ showOpponentFound }
            onHide={ handleCloseOpponentFound }
            roomID={ roomID }
            playerID={ playerID }
            opponentID={ opponentID }
            handleGoToNextPage={ handleGoToNextPage }
            onCountdownEnd={ reset }
            />
        </div>
    );
}


/**
 * react function which makes copy button in create room modal
 * @param {property} props 
 * @returns copy button
 */
function ButtonCopy(props){
    const handleCopyRoomID = () => {                                // handler for the event when "copy" button is clicked
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(props.roomID);

        /* Alert the copied text */
        alert("Copied the text: " + props.roomID);
    }

    return(
        <Button variant="outline-secondary" id="button-copy-roomID" onClick={ handleCopyRoomID }>
        Copy
        </Button>
    )
}


/**
 * react function which makes join button in create room modal
 * @param {property} props 
 * @returns join button
 */
function ButtonJoin(props){
    const [buttonJoinDisabled, setButtonJoinDisabled] = useState(true);

    /* disables and enables join button */
    useEffect(() => {
        /* if length of roomID is equal to 6, enable join button, else disable */
        if(props.roomID.length === 6){
            setButtonJoinDisabled(false);
        }else{
            setButtonJoinDisabled(true);
        }
    }, [props.roomID])

    return(
        <Button onClick={ props.onClick } disabled={ buttonJoinDisabled }>Join</Button>
    )
}