import './App.css';
import React from 'react';
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import MakeAppointment from './components/makeAppointment';
import ProtectedRoute from './components/ProtectedRoute';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router >
      <Routes >
          <Route exact path = "/" element = { <Welcome/> }/>
          <Route path = "/login" element = {<Login/>} />  
          <Route path='/register' element = {<Register />} />
          <Route path='/makeappointment'
                 element = {
                  <ProtectedRoute>
                    <MakeAppointment />
                  </ProtectedRoute>
                }        
          />
      </Routes>
    </Router>
  );
}

export default App;
