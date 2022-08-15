import '../../assets/css/Home.css';
import React from 'react';
import LogSignOrNot from './components/LogSignOrNot';
import CreateRoom from './components/CreateRoom';
/**
 * 
 * @returns Home page
 */
export default function Home(){
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
