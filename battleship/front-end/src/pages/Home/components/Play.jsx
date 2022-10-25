import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import JoinRoom from "./JoinRoom";
import OpponentFound from "./OpponentFound";
import * as io from "../../../io-client-handler"
import { LoggedInContext, PlayerContext } from "../Home";
import play from "../../../assets/images/Home/play.png";
import "../../../assets/css/playimage.sass";

export default function Play() {
    const navigate = useNavigate()

    const isLoggedIn = useContext(LoggedInContext)
    const player = useContext(PlayerContext)

    const [disable, setDisable] = useState(true)
    const [showJoinRoom, setShowJoinRoom] = useState(false);                   //'show' state of the modal "Joining Room"
    const [showOpponentFound, setShowOpponentFound] = useState(false);         //"show" state of the modal "Opponent Found"
    const [roomID, setRoomID] = useState("")
    const [opponentID, setOpponentID] = useState("");                          //id of opponent

    /* resets the modal */
    const reset = () => {
        setShowJoinRoom(false);
        setRoomID("");
        setShowOpponentFound(false);
    }

    /* handles event on "cancel" button clicked */
    const handleCloseJoinRoom = () => setShowJoinRoom(false);

    /* handles event on "join" button clicked on the home page */
    const handleShowJoinRoom = () => setShowJoinRoom(true);

    const handleShowOpponentFound = () => setShowOpponentFound(true);

    const handleCloseOpponentFound = () => setShowOpponentFound(false);

    const handlePlayClicked = () => {
        handleShowJoinRoom()

        io.socket.emit("join-queue", player.id, player.score, (isSuccessful) => {
            if(!isSuccessful){
                alert("Some error occured!")
                handleCloseJoinRoom()
                return
            }
        })
    }

    const handleCancel = () => {
        io.socket.emit("remove-from-queue", player.id)
        handleCloseJoinRoom();
    }
    /* handles event to go to next page */
    const handleGoToNextPage = () => {
        /* close modal "join room" */
        handleCloseJoinRoom();
        
        /* send signal to enter "ship placement" page with roomID*/
        navigate("/placement", { 
            state: {
                roomID, 
                playerID: player.id, 
                opponentID, 
                socketID: io.socket.id 
            },
            replace: true 
        });

        /* reset this modal */
        reset();
    }

    io.socket.off("send-roomID").on("send-roomID", (roomID) => {
        console.log("Received roomID: " + roomID)
        setRoomID(roomID)

        /* close modal "Join Room" */
        handleCloseJoinRoom()
    })

    /* if "lobby-full" signal received from server, go to next page */
    io.socket.off("lobby-full").on("lobby-full", () => {
        console.log("Lobby is full. Now starting...");

        io.socket.emit("get-opponentID", roomID, (isSuccessful, playerID, opponentID) => {
            if(!isSuccessful){
                alert("Error: Could not receive opponent's playerID")
                return
            }

            setOpponentID(opponentID);
        });

        /* close modal "Join Room" */
        handleCloseJoinRoom();

        /* show modal "Opponent Found" */
        handleShowOpponentFound();
    })

    useEffect(() => {
        if(isLoggedIn){
            setDisable(false)
        }else{
            setDisable(true)
        }
    }, [isLoggedIn])

    return (
        <>
            {/* <Button onClick={ handlePlayClicked } disabled={ disable }>P</Button> */}
            <img src={play} alt="play" className="playimg" onClick={ handlePlayClicked } disabled={ disable } />
            <JoinRoom
            show={ showJoinRoom }
            onHide={ handleCloseJoinRoom }
            onCancel={ handleCancel }
            />

            <OpponentFound
            show={ showOpponentFound }
            onHide={ handleCloseOpponentFound }
            roomID={ roomID }
            playerID={ player.id }
            opponentID={ opponentID }
            handleGoToNextPage={ handleGoToNextPage }
            onCountdownEnd={ reset }
            />
        </>
    )
}