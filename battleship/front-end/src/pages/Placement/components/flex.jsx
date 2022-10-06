import React from "react";
import "../../../assets/css/flex.sass";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
 
export default function Flex()
{
    let board =[];

    for(let j=verticalAxis.length-1;j>=0;j--)
    {
        for(let i=0;i<horizontalAxis.length;i++)
        {
            board.push(
                <Square />
            );
        }
    }
    return(
        <div className="flex-container">{board}</div>
    );
}

function Square(){
    

    return(
        <div className="tiles"></div>
    )
}