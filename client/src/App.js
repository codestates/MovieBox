import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="box">
        <Headers/>
        <Main/>
        <Navbar />
      
    </div>
  );
}

export default App;