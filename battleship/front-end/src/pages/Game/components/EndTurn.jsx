import Button from "react-bootstrap/esm/Button";
import { useLocation } from "react-router-dom";
import * as io from "../../../io-client-handler"

export default function EndTurn({ setTurn }){
    const location = useLocation()

    const handleClick = () => {
        io.socket.emit("switch-turn", location.state.roomID)
        setTurn(false)
    }
    
    return(
        <Button onClick={ handleClick }>End Turn</Button>
    )
}