import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

export default function JoinRoom(props){
    return(
        <Modal
        show={ props.show }
        onHide={ props.onHide }
        size="sm"
        backdrop="static"
        keyboard="false"
        centered>
            <Modal.Header>
                <Modal.Title>Joining room: { (props.isCustom)? props.roomID: "" }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h3>Waiting for opponent...</h3>
                <Spinner animation="grow" />;
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ props.onCancel }>Cancel</Button>
            </Modal.Footer>

        </Modal>
    )
}