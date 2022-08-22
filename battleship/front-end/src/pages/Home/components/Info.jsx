import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/info.sass';

export default function Info()
{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <div className="infoBack">
        <button className="button-info" size='lg' bsPrefix='Home' variant="success" onClick={handleShow}>
            Information</button>
        <Modal
            show={show}
            onHide={handleClose}
            size="sm"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>App Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Battleship is a war-themed board game for two players in which the opponents 
                    try to guess the location of their opponent's warships and sink them.</p>
                    <ul > <h5>Developers</h5>
                    <li>Bigyan</li>
                    <li>Hridaya</li>
                    <li>Manish</li>
                    <li>Shashanka</li>
                    </ul> 
                    </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
        </Modal>
    </div>
    );
}