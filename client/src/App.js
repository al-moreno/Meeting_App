import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import IncomingUpdates from './Components/IncomingUpdates';
import Admin from './Components/Admin';


function App() {
  return (
    <Router>

      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/incomingupdates' roles={["user", "admin"]} element={<IncomingUpdates />} />
        <Route path='/admin' roles={["admin"]} element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
