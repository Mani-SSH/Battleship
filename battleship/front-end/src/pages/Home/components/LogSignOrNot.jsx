import React, { useState } from 'react';
import "../../../assets/css/log.sass"
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../../../assets/css/CreateRoom.sass"

export default function LogSignOrNot(props)
{
    return props.isLoggedIn?renderUser():renderButtons();
}

function renderButtons()
{
    const [showLogIn, setShowLogIn] = useState(false);

    const handleShowLogIn = () => setShowLogIn(true);

    const handleCloseLogIn = () => setShowLogIn(false);

    return (
        <div id='log' className='sign'>
            <Button className='logg' size='lg' bsPrefix='Home' onClick={ handleShowLogIn }>Log In</Button>
            <Button className='logg1' size='lg' bsPrefix='Home' onClick={ handleSignUp }>Sign Up</Button>
            <LogIn 
                show={ showLogIn }
                onHide={ handleCloseLogIn }
            />
        </div>
    )
}

function renderUser()
{
    return(
        <div><h3>Show username and rank points</h3></div>
    )
}

function LogIn(props){
    return(
        <Modal
        show={ props.showLogIn }
        onHide={ props.onHide }
        >
            
        </Modal>

    )
}