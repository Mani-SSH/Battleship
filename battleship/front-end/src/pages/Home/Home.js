import '../../assets/css/Home.css';
import React, { useEffect } from 'react';
import LogSignOrNot from './components/LogSignOrNot';
import CreateRoom from './components/CreateRoom';
import { io } from "socket.io-client";

function Home(){
  const conn = () => {
    const socket = io("http://localhost:5000");
  }

  const handleGenerateRoom = (socket) =>{
    
  }

  useEffect(() => {
    conn();
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
