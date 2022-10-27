import { useContext, useState, useEffect } from "react"
import { PlayerContext } from "../Home"
import "../../../assets/css/userinfo.sass";
import { PlayerUpdateContext,LoggedInUpdateContext } from "../Home";
import Player from "../../../player";
import {BsPersonBoundingBox} from 'react-icons/bs';
import {HiOutlineInformationCircle} from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import '../../../assets/css/info.sass';

import * as io from "../../../io-client-handler"

export default function UserInfo()
{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const player = useContext(PlayerContext);
    const [logout, setlogout] = useState(false);
    const setPlayer = useContext(PlayerUpdateContext);
    const setIsLoggedIn = useContext(LoggedInUpdateContext);

    useEffect(() => {
        if(logout) {
            setPlayer(new Player());
            setIsLoggedIn(false);
        }
    }, [logout]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleClick = () =>{        
        io.socket.emit("request-logout", player.name, player.tag, (err, LogOutSuccessfull) =>{
            if (err)
            {
                console.log("there is error in logging Out", err)
            }
            if(LogOutSuccessfull === true)
            {
                setlogout(true)   
            }
            else
            {
                console.log("The user has been logged out")
            }
        })   

    }
    return(
        <div className="uinfoBack">
            <BsPersonBoundingBox className="pinfo"  onClick={handleShow}/>
        <Modal className="uinfo-modal"
            show={show}
            onHide={handleClose}
            size="sm"
            centered
            >
                <Modal.Header className="uinfo-header" closeButton>
                    <Modal.Title className="unfo-title">Player Identity <HiOutlineInformationCircle className="info-icon"/></Modal.Title>
                </Modal.Header>
                <Modal.Body className="unfo-body">
                    <h3>Name: { player.name }</h3>
                    <h4>PlayerTag: { player.name.concat("#", player.tag) }</h4>
                    <h3>Score: { player.score }</h3>                   
                    </Modal.Body>
                <Modal.Footer className="unfo-footer">
                <button className="logout" onClick={ handleClick }>Logout</button>
                </Modal.Footer>
        </Modal>
    </div>
    )
}