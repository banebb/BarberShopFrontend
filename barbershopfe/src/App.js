import './App.css';
import React from 'react';
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import MakeAppointment from './components/makeAppointment';
import ProtectedRoute from './components/ProtectedRoute';
import ThankYou from './components/thankYou';
import Home from './components/home';
import UsersAppointments from './components/usersappointments';
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
          <Route path='/home'
                 element = {
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }        
          />
          <Route path='/thank-you' element= {<ThankYou /> } />
          <Route path='/usersappointments' 
                  element = {
                    <ProtectedRoute>
                      <UsersAppointments />
                    </ProtectedRoute>
                  }
          />
      </Routes>
    </Router>
  );
}

export default App;
