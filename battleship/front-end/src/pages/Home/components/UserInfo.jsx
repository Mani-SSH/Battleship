import { useContext, useState } from "react"
import { PlayerContext } from "../Home"
import "../../../assets/css/userinfo.sass";
import { PlayerUpdateContext,LoggedInUpdateContext } from "../Home";
import Player from "../../../player";
import {MdOutlinePermIdentity} from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import '../../../assets/css/info.sass';
import bModal from "../../../assets/images/modal/boxModal.png";
import Button from "react-bootstrap/esm/Button";
import playid from "../../../assets/images/modal/id.png";
import * as io from "../../../io-client-handler"

export default function UserInfo()
{

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const player = useContext(PlayerContext);

    const setPlayer = useContext(PlayerUpdateContext);
    const setIsLoggedIn = useContext(LoggedInUpdateContext);

    const handleClick = () =>{        
        io.socket.emit("request-logout", player.name, player.tag, (err, LogOutSuccessfull) =>{
            if (err)
            {
                console.log("there is error in logging Out", err)
            }
            if(LogOutSuccessfull === true)
            {
                setPlayer(new Player());
                setIsLoggedIn(false);  
            }
            else
            {
                console.log("The user has been logged out")
            }
        })   

    }
    return(
        <div className="uinfoBack">
            <button className="imageinfo" onClick={handleShow}><img src={playid} /></button>
        <Modal className="uinfo-modal"
            show={show}
            onHide={handleClose}
            size="md"
            centered
            >
                <Modal.Body className="uinfo-body">
                    <img src={bModal} alt="modal" className="boxmodal" />
                    <div className='modaltext'>
                    <h1>Player Identity <MdOutlinePermIdentity className="info-icon"/></h1>
                    <h3>Name: { player.name }</h3>
                    <h4>PlayerTag: { player.name.concat("#", player.tag) }</h4>
                    <h2>Score: { player.score }</h2>   
                    <Button className="uinfo-btn" onClick={ handleClick }>Logout</Button> 
                    </div>               
                </Modal.Body>            
        </Modal>
    </div>
    )
}