import '../../assets/css/Home.css';
import React, { useEffect } from 'react';
import LogSignOrNot from './components/LogSignOrNot';
import CreateRoom from './components/CreateRoom';
import * as io from '../../io-client-handler';

function Home(){
  const handleGenerateRoom = (socket) =>{
    
  }

  useEffect(() => {
    //io.conn();
  }, [])

  return (
    <div id='call' className='Home'>
      <header className='Home-header'>
        BATTLESHIP
      </header>
      <div id='call1' className='Homie'>
        <button className='button-basic'>Play</button>
      </div>
      <LogSignOrNot />
      <CreateRoom />
    </div>
  );
}

export default Home;
