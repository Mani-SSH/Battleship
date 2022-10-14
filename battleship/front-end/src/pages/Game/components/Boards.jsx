import { useState } from "react"
import * as io from "../../../io-client-handler"

import OpponentBoard from "./OpponentBoard"
import PlayerBoard from "./PlayerBoard"

export default function Boards() {
    const [turn, setTurn] = useState(true)

    io.socket.off("switched-turn").on("switched-turn", () => {
        setTurn(true)
        console.log("Opponent ended turn")
    })

    return (
        <>
        <div style={ { display: turn? "block" : "none"} }>
            <OpponentBoard setTurn={ setTurn }/>
        </div>
        <div style={ { display: (!turn)? "block" : "none"} }>
            <PlayerBoard setTurn={ setTurn }/>
        </div>
        </>
    )
}
