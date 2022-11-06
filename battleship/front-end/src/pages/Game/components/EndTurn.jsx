import Button from "react-bootstrap/esm/Button";
import { useLocation } from "react-router-dom";
import * as io from "../../../io-client-handler"
import "../../../assets/css/gameBoard.sass";

export default function EndTurn({ onClick }){
    const location = useLocation()

    const handleClick = () => {
        io.socket.emit("switch-turn", location.state.roomID)
        onClick()
    }
    
    return(
        <button onClick={ handleClick } className="endTurnBtn">End Turn</button>
    )
}