import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../assets/css/joinroom.sass";

export default function JoinRoom(props){
    return(
        <Modal className='join-modal'
            show={ props.show }
            onHide={ props.onHide }
            size="sm"
            backdrop="static"
            keyboard="false"
            centered>
            <Modal.Header className='join-header'>
                <Modal.Title className='join-title'>Joining room: { (props.isCustom)? props.roomID: "" }</Modal.Title>
            </Modal.Header>

            <Modal.Body className='join-body'>
                <h2>Waiting for opponent...</h2>
                <div className='spinner-border text-success m-2' role="status">
                </div>
                <h6>Loading...</h6>
            </Modal.Body>

            <Modal.Footer className='join-footer'>
                <Button variant="primary" onClick={ props.onCancel }>Cancel</Button>
            </Modal.Footer>

        </Modal>
    )
}