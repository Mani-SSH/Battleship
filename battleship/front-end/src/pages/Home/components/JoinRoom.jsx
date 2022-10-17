import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "../../../assets/css/joinroom.sass";

export default function JoinRoom({ show, onHide, isCustom, roomID, onCancel }){
    return(
        <Modal className='join-modal'
            show={ show }
            onHide={ onHide }
            size="sm"
            backdrop="static"
            keyboard="false"
            centered>
            <Modal.Header className='join-header'>
                <Modal.Title className='join-title'>Joining room: { (isCustom)? roomID: "" }</Modal.Title>
            </Modal.Header>

            <Modal.Body className='join-body'>
                <h2>Waiting for opponent...</h2>
                <div className='spinner-border text-success m-2' role="status">
                </div>
                <h6>Loading...</h6>
            </Modal.Body>

            <Modal.Footer className='join-footer'>
                <Button variant="primary" onClick={ onCancel }>Cancel</Button>
            </Modal.Footer>

        </Modal>
    )
}

JoinRoom.defaultProps = {
    isCustom: false,
    roomID: ""
}