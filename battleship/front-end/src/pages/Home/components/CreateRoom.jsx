import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../../assets/css/Home.css';

var handleGenerateRoom = () => {
    
}

export default function CreateRoom() {
    const [isOpen, setIsOpen] = useState(false);
  
    function toggleModal() {
      setIsOpen(!isOpen);
    }
  
    return (
        <div id='call1' className='Homie'>
            <button className='button-basic1'onClick={toggleModal}>Create room</button>

            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel='Create room'
            >
                <div>Create Room</div>
                <input placeholder='Enter room no.' maxlength="6"></input>
                <button>Join</button>
                <button onClick={handleGenerateRoom}>Generate Room</button>
                <button onClick={toggleModal}>Close</button>
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