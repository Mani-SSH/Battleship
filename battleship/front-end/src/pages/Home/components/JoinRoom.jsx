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
        centered>
            <Modal.Header>
                <Modal.Title>Joining room: { (props.isCustom)? props.roomID: "" }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h2>Waiting for opponent...</h2>
                <div className='spinner-border text-success m-2' role="status">
                    <span className='sr-only'></span>
                </div>
                <div>Loading...</div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={ props.onCancel }>Cancel</Button>
            </Modal.Footer>

        </Modal>
    )
}