import { useState } from "react";

import "../../../assets/css/gameBoard.sass";

export default function PlayerBoard() {
    let board = []

     /* setting board */
     for(let j=1; j <= 9; j++)
     {
         for(let i = 1; i <= 9; i++)
         {
            board.push(
                <Square 
                key={ 10*j + i }
                x={j}
                y={i}
                />
            );
         }
     }

    return (
        <div className="gBoard">
            { board }
        </div>
    )
}

function Square({x, y}) {
    const [color, setColor] = useState("white")
    const [bombed, setBombed] = useState(false)

    const mystyle = {
        backgroundColor:color,
        opacity:1,
        width:50+ 'px',
        height:50+'px',
        border:'1px solid black',
    }

    return(
        <div 
        className="tiles"
        style={mystyle}
        >
        {(bombed)? "bombed" : "clear"}
        </div>
    )
}