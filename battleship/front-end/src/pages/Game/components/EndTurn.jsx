import Button from "react-bootstrap/esm/Button";
import { useLocation } from "react-router-dom";
import * as io from "../../../io-client-handler"

export default function EndTurn({ onClick }){
    const location = useLocation()

    const handleClick = () => {
        io.socket.emit("switch-turn", location.state.roomID)
        onClick()
    }
    
    return(
        <Button onClick={ handleClick }>End Turn</Button>
    )
}