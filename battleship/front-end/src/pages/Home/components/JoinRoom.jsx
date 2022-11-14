import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "../../../assets/css/joinroom.sass";
import bgModal from "../../../assets/images/modal/bgModal.png";

export default function JoinRoom({ show, onHide, isCustom, roomID, onCancel }){
    return(
        <Modal className='join-modal'
            show={ show }
            onHide={ onHide }
            size="sm"
            backdrop="static"
            keyboard="false"
            centered>

            <Modal.Body className='join-body'>
                <img src={bgModal} alt="modal" className="bgmodal" />
                <div className='modaltext'>
                <h1>Joining room: { (isCustom)? roomID: "" }</h1>
                <h2>Waiting for opponent...</h2>
                <div className='spinner-border text-success m-2' role="status">
                </div>
                <h6>Loading...</h6>
                <Button className='join-btn' onClick={ onCancel }>Cancel</Button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

JoinRoom.defaultProps = {
    isCustom: false,
    roomID: ""
}