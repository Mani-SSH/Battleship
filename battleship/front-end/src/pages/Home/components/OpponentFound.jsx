import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from 'react';
import * as io from "../../../io-client-handler";

export default function OpponentFound(props){
    const [ready, setReady] = useState(false);
    const [opponentReady, setOpponentReady] = useState(false);

    const handleReadyClicked = () => {
        setReady(true);
        io.socket.emit("player-ready", props.roomID);
    }

    io.socket.off("oppponent-ready").on("oppponent-ready", () => {
        console.log("Opponent is ready...")
        setOpponentReady(true)
    })

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
                    handleGoToNextPage={ props.handleGoToNextPage }
                    /> :
                    <>
                        <h3><Countdown count={ 10 } onEnd={ props.onCountdownEnd } /></h3>
                        <br/>
                        <Button onClick={ handleReadyClicked }>Ready</Button>
                    </>
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
            <h1>{ (props.playerReady && props.opponentReady)? <>Starting on <Countdown count={ 3 } onEnd={ props.handleGoToNextPage }/>...</>:<></> }</h1>
        </div>
    )
}


function Countdown(props){
    const [count, setCount] = useState(props.count)
    
    useEffect(() => {
        const interval = setInterval(() => setCount(count => count - 1), 1000)
        return () => clearInterval(interval)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(count === 0){
            props.onEnd();
        }
    }, [count]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>{ count }</>
    )
}
