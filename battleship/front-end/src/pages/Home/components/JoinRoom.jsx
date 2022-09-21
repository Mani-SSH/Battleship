import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function JoinRoom(props){

    return(
        <Modal
        show={ props.show }
        onHide={ props.onHide }
        size="sm"
        backdrop="static"
        keyboard="false"
        centered
        >
            <Modal.Header>
                <Modal.Title>Joining room: { props.roomID }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h3>Waiting for opponent...</h3>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={ props.onCancel }>Cancel</Button>
            </Modal.Footer>

        </Modal>
    )
}