import React, { useEffect, useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import "../../../assets/css/log.sass"

import * as io from "../../../io-client-handler"

export default function LogInNSignUp(props)
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
            onLogIn={ props.onLogIn }
            />
        </>
    )
}



/**
 * @param {property} props 
 * @returns Log In modal
 */
function LogIn(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [tag, setTag] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleToggleShowPassword = () => setShowPassword(!showPassword);

    const handleLogInClicked = () => {
        io.socket.emit("user-login", username, tag, password, (isSuccessful) => {
            if(isSuccessful){
                
            }
        })
    }

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
                    maxLength={ 14 }
                    />
                    <InputGroup.Text>#</InputGroup.Text>
                    <Form.Control
                    placeholder="Tag"
                    value={tag}
                    onChange={ (e) => { setTag(e.target.value) } }
                    maxLength={ 4 }
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Password"
                    type={ (showPassword)? "text" : "password"}
                    value={password}
                    onChange={ (e) => { setPassword(e.target.value) } }
                    maxLenght={ 20 }
                    />
                </InputGroup>
                
                <Form.Check
                type="switch"
                label="Show password"
                onChange={ handleToggleShowPassword }
                />
            </Modal.Body>

            <Modal.Footer>
                <ButtonLogIn
                onClick={ handleLogInClicked }
                password={ password }
                username={ username }
                tag={ tag }
                />
            </Modal.Footer>
        </Modal>

    )
}

function ButtonLogIn(props){
    const [isDisabled, setDisabled ] = useState(false);

    useEffect(() => {
        if(props.password.length === 0 || props.username.length === 0 || props.hash.length !== 4){
            setDisabled(true);
        }else{
            setDisabled(false);
        }
    }, [props.password, props.username, props.hash])

    return(
        <Button
        onClick={ props.onClick }
        disabled={ isDisabled }
        >Log In</Button>
    )
}