import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Admin from './Admin';
import AdminHome from './AdminHome';
import FacultyLogin from './FacultyLogin';
import FacultyRegister from './FacultyRegister';
import Attendance from './Attend';
import Choose from './Choose';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/facultyregister" element={<FacultyRegister />} />
          <Route path="/facultylogin" element={<FacultyLogin />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/" element={<Choose />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
