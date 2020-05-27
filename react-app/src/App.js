import React from 'react';
import { Route } from 'react-router-dom';

//Components
import Navbar from './components/Navbar'
import Login from './components/Login'
import Form from './components/Registration'
import UserDashboard from './components/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute'


//Styles
import './index.css'

function App() {
  // start of return statement
  return (
    <>
      <Navbar />
      {/* Start of Login */}
      <Route exact path='/' >
        <Login />
      </Route>
      {/* end of Login */}

      {/* start of registration */}
      <Route exact path='/Registration'>
        <Form />
      </Route>
      {/* end of my registration */}

      <ProtectedRoute path='/dashboard/:username' component={UserDashboard} />

    </>
  )
}

export default App