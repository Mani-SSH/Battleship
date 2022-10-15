import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/info.sass';
import {HiOutlineInformationCircle} from "react-icons/hi";

export default function Info()
{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <div className="infoBack">
        <button className="button-info" size='lg' variant="success" onClick={handleShow}>
            Information</button>
        <Modal className="info-modal"
            show={show}
            onHide={handleClose}
            size="sm"
            centered
            >
                <Modal.Header className="info-header" closeButton>
                    <Modal.Title className="info-title">App Information <HiOutlineInformationCircle className="info-icon"/></Modal.Title>
                </Modal.Header>
                <Modal.Body className="info-body">
                    <p>Battleship is a war-themed board game for two players in which the opponents 
                    try to guess the location of their opponent's warships and sink them.</p>
                    <ul > <h5>Developers</h5>
                    <li>Bigyan</li>
                    <li>Hridaya</li>
                    <li>Manish</li>
                    <li>Shashanka</li>
                    </ul> 
                    <ul> <h5>SuperVisor</h5>
                    <li>Amrit Dahal</li>
                    </ul>
                    </Modal.Body>
                <Modal.Footer className="info-footer">
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
        </Modal>
    </div>
    );
}