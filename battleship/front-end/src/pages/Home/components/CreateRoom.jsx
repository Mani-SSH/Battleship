import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/Home.css';

var handleGenerateRoom = () => {
    
}

export default function CreateRoom() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <div id='call1' className='Homie'>
            <Button className='button-basic1' size="lg" bsPrefix='Home' variant="success" onClick={handleShow}>
                Create Room
            </Button>

            <Modal
            show={show}
            onHide={handleClose}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Room</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input placeholder='Enter room no.' maxlength="6"></input>
                </Modal.Body>

                <Modal.Footer>
                    <Button>Join</Button>
                    <Button onClick={handleGenerateRoom}>Generate Room</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  }

  /**
class CreateRoom extends Component{
    state = {
        isOpen : false,
    }

    toggleModal() {
        setIsOpen(!isOpen);
    }

    setIsOpen(){
        this.isOpen = true;
    }

    render(){
        return(
        <div id='call1' className='Homie'>
            <button className='button-basic1'onClick={toggleModal}>Create room</button>

            <Modal>
            <script>
                this.isOpen={isOpen};
                this.onRequestClose={toggleModal};
                this.contentLabel="Create Room";
            </script>
                <div>Create Room</div>
                <button>Generate Room</button>
                <button onClick={toggleModal}>Close</button>
            </Modal>
        </div>
        )
    }
}
*/