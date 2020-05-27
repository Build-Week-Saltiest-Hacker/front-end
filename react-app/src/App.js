import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import Form from './components/Registration';
import axios from 'axios';
import * as yup from 'yup';
import formValidate from './components/FormValidate'

function App() {



  // start of return statement
  return (


    <div className="App">
      <header className="App-header">


        {/* Start of Login */}
        <Route exact path='/' >
          <Login />
        </Route>
        {/* end of Login */}


        {/* start of registration */}
        <Route exact path='/Registration' >
          <Form />

        </Route>
        {/* end of my registration */}


      </header>
    </div>

  )
}

export default App