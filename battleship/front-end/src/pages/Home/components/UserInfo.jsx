import { useContext, useState, useEffect } from "react"
import { PlayerContext } from "../Home"
import "../../../assets/css/userinfo.sass";
import { PlayerUpdateContext,LoggedInUpdateContext } from "../Home";
import Player from "../../../player";
import {BsPersonBoundingBox} from 'react-icons/bs';
import {HiOutlineInformationCircle} from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import '../../../assets/css/info.sass';

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
    return(
        // <div className="card">
        //     <BsInfoSquareFill  onClick={handleShow}/>
        // <div className="card-body">
        //     <h5 class="card-title">Player Identity</h5>
        //     <h3>Name: { player.name }</h3>
        //     <h4>PlayerTag: { player.name.concat("#", player.tag) }</h4>
        //     <h3>Score: { player.score }</h3>
        //     <button className="logout" onClick={ () => setlogout(true) }>Logout</button>
        // </div>
        // </div>
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
                <button className="logout" onClick={ () => setlogout(true) }>Logout</button>
                </Modal.Footer>
        </Modal>
    </div>
    )
}