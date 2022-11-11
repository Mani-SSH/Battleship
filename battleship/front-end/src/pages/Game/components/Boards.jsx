import { useState } from "react"
import { useLocation } from "react-router-dom"
import * as io from "../../../io-client-handler"

import OpponentBoard from "./OpponentBoard"
import PlayerBoard from "./PlayerBoard"
import WinLoseModal from "./WinLoseModal"

export default function Boards({ roomID, setTurn, turn }) {
    const location = useLocation()

    const [showModal, setShowModal] = useState(false)
    const [win, setWin] = useState(false)

    io.socket.off("switched-turn").on("switched-turn", () => {
        setTurn(true)
        console.log("Opponent ended turn")
    })

    io.socket.off("game-over").on("game-over", (winnerSocketID) => {
        let hasWin = false

        /* show win or lose */
        if(io.socket.id === winnerSocketID){
            hasWin = true
        }

        /* if ranked match update score */
        if(location.state.isCustom === false){
            io.socket.emit("update-player-score", location.state.playerID, hasWin)
        }

        setTimeout(() => {
            setWin(hasWin)
            setShowModal(true)
        }, 2000) 
    })

    return (
        <>
        <div style={ { display: turn? "block" : "none"} }>
            <OpponentBoard setTurn={ setTurn } roomID={ roomID } turn = { turn }/>
        </div>
        <div style={ { display: (!turn)? "block" : "none"} }>
            <PlayerBoard setTurn={ setTurn }/>
        </div>
        <WinLoseModal
            show={ showModal }
            onHide={ () => setShowModal(false) }
            hasWin={ win }
        />
        </>
    )
}
