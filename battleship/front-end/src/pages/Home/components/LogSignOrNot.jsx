import React, { useState } from 'react';
import "../../../assets/css/log.sass"

export default function LogSignOrNot()
{
    const [isLoggedIn, setisLoggedIn] = useState(false);
    return isLoggedIn?renderUser():renderButtons();
}

function renderButtons()
{
    return (
        <div id='log' className='sign'>
            <button className='logg' size='lg' bsPrefix='Home'>Log In</button>
            <button className='logg1' size='lg' bsPrefix='Home'>Sign Up</button>
        </div>
    )
}

function renderUser()
{
    return(
        <div><h3>Show username and rank points</h3></div>
    )
}