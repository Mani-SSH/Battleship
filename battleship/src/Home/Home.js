import './Home.css';
import React, { Component } from 'react';
import LogSignOrNot from './components/LogSignOrNot';

class Home extends Component{
  render(){
    return (
      <div id='call' className='Home'>
        <header className='Home-header'>
          BATTLESHIP
        </header>
        <div id='call1' className='Homie'>
          <button className='button-basic'>Play</button>
        </div>
        <div id='call1' className='Homie'>
          <button className='button-basic1'>Create room</button>
        </div>
        <LogSignOrNot />
      </div>
    );
  }
}

export default Home;
