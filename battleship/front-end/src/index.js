import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import Home from './pages/Home/Home';
import Placement from './pages/Placement/Placement';
import Game from './pages/Game/Game'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as io from "./io-client-handler"

export default function App() {
  io.socket.on('ping', function(data){
    io.socket.emit('pong', {beat: 1});
  });

  return(
    <div className='App'>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path="placement" element={ <Placement/> } />
          <Route path='game' element={ <Game /> } />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);