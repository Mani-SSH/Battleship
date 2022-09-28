import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import Home from './pages/Home/Home';
import Placement from './pages/Placement/Placement';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return(
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path="placement" element={ <Placement/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);