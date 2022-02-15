import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.js';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MeetingItems from './Components/MeetingItems/MeetingItems';
import Admin from './Components/Admin/Admin';
import { AuthContext } from './Context/AuthContext';
import MeetingNav from './Components/MeetingNav/MeetingNav';
import PositiveStart from './Components/PositiveStart/PositiveStart';
import Almanac from './Components/Almanac/Almanac';
import QuarterlyGoals from './Components/QuarterlyGoals/QuarterlyGoals';
import Weeds from './Components/Weeds/Weeds';
import WrapUp from './Components/WrapUp/WrapUp';





const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      {isAuthenticated && <MeetingNav />}

     


      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' roles={["admin"]} element={<Admin />} />
        <Route path='/positivestart' roles={["user", "admin"]} element={<PositiveStart />} />
        <Route path='/incomingupdates' roles={["user", "admin"]} element={<MeetingItems  category='incomingupdates' />} />
        <Route path='/almanac' roles={["user", "admin"]} element={<Almanac />} />
        <Route path='/quarterlygoals' roles={["user", "admin"]} element={<QuarterlyGoals />} />
        <Route path='/weeds' roles={["user", "admin"]} element={<Weeds />} />
        <Route path='/wrapup' roles={["user", "admin"]} element={<WrapUp />} />
      </Routes>
    </Router>
  );
}

export default App;
