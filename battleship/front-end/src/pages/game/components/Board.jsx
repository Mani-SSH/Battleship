import "../../../assets/css/gameBoard.sass";

import React, { useState } from "react";
 
const VA = [];
const HA = [];


export default function Board() {

    let board =[];

    
    /* setting board */
    for(let j=1; j <= 9; j++)
    {
        for(let i = 1; i <= 9; i++)
        {
    
            board.push(
                <div className="tiles">{HA[i]} {VA[j]}</div>
            );
        }
    }
       
    return(
        <>
            <div className="gBoard">{board}</div>
        </>
    );
}