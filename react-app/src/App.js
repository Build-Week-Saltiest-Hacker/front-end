import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import Form from './components/Registration';



function App() {



  // start of return statement
  return (


    <div>



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



    </div>

  )
}

export default App