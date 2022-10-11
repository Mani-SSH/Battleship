import "../../../src/assets/css/Game.sass";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Board from "./components/Board";

export default function Game()
{
    const location = useLocation();
    const navigate = useNavigate();
    return(
        <div> <Board /></div>
    );

}
