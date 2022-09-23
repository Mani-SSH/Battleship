import React, { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import "../../../assets/css/log.sass"


export default function LogSignOrNot(props)
{
    return(
        <div id='log' className='sign'>
            { (props.isLoggedIn)? <User />: <ButtonsLogInNSignUp /> }
        </div>
    ) 
}

function ButtonsLogInNSignUp()
{
    const [showLogIn, setShowLogIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const handleShowLogIn = () => setShowLogIn(true);

    const handleCloseLogIn = () => setShowLogIn(false);

    const handleShowSignUp = () => setShowSignUp(true);

    const handleCloseSignUp = () => setShowSignUp(false);

    return (
        <>
            <Button className='logg' size='lg' bsPrefix='Home' onClick={ handleShowLogIn }>Log In</Button>
            <Button className='logg1' size='lg' bsPrefix='Home' onClick={ handleShowSignUp }>Sign Up</Button>
            <LogIn 
                show={ showLogIn }
                onHide={ handleCloseLogIn }
            />
        </>
    )
}

function User()
{
    return(
        <div><h3>Show username and rank points</h3></div>
    )
}

function LogIn(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    return(
        <Modal
        show={ props.show }
        onHide={ props.onHide }
        size="md"
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Username"
                    value={username}
                    onChange={ (e) => { setUsername(e.target.value) } }
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={ (e) => { setPassword(e.target.value) } }
                    />
                </InputGroup>
                
                <Form.Check
                type="switch"
                label="Show password"
                />
            </Modal.Body>
        </Modal>

    )
}