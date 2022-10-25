import { useEffect, useState } from "react"
import * as io from "../../../io-client-handler"

import OpponentBoard from "./OpponentBoard"
import PlayerBoard from "./PlayerBoard"

export default function Boards({ roomID }) {
    
    const [turn, setTurn] = useState(true)

    io.socket.off("switched-turn").on("switched-turn", () => {
        setTurn(true)
        console.log("Opponent ended turn")
    })

    io.socket.off("game-over").on("game-over", (winnerSocketID) => {
        if(io.socket.id === winnerSocketID){
            alert("Victory Royale!!!")
        }else{
            alert("You lose")
        }
    })

    useEffect(() => {
        io.socket.emit("get-turn", roomID, (isSuccessful, socketIDofFirst) => {
            if(!isSuccessful){
                alert("Some error occured!")
                return
            }

            /* if socket id of first turn matches the socket id, set turn true */
            if(io.socket.id === socketIDofFirst){
                setTurn(true)
            }else{
                setTurn(false)
            }
        })
    }, [])

    return (
        <>
        <div style={ { display: turn? "block" : "none"} }>
            <OpponentBoard setTurn={ setTurn } roomID={ roomID } turn = { turn }/>
        </div>
        <div style={ { display: (!turn)? "block" : "none"} }>
            <PlayerBoard setTurn={ setTurn }/>
        </div>
        </>
    )
}
