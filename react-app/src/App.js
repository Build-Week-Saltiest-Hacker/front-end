import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import Form from './components/Form';
import axios from 'axios';
import * as yup from 'yup';
import formValidate from './components/FormValidate'

function App() {
  //start of consts\\ 
  const initialError = {
    username: '',
    email: '',
    password: '',

  }
  const initialFormState = {
    username: '',
    email: '',
    password: '',
    TOS: false,
  }
  const initialUsername = []
  const initialDisabled = true
  //~~~~~~~~~~~~~~~~~~STATES~~~~~~~~~~~~~~~~~~\\
  const [username, setUsername] = useState(initialUsername)
  const [disabled, setDisabled] = useState(initialDisabled)
  const [formState, setFormState] = useState(initialFormState);

  const [errors, setErrors] = useState(initialError);
  //~~~~~~~~~~~~~~~~~~start of post~~~~~~~~~~~~~~~~~~\\

  const postNewUsername = newUsername => {

    axios.post('https://cors-anywhere.herokuapp.com/https://saltiest-hacker-lambda.herokuapp.com/api/auth/register', newUsername)
      .then(res => {
        console.log({ res })
        setUsername([res.data, ...username])

      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        setFormState(initialFormState)
      })
  }

  //~~~~~~~~~~~~~~~~~~ Event Handlers ~~~~~~~~~~~~~~~~~~\\
  //~~~~~~~~~~~~~~~~~~  Validation / Schema ~~~~~~~~~~~~~~~~~~ \\
  const validateChange = evt => {
    const name = evt.target.name
    const value = evt.target.value
    yup.reach(formValidate, name)
      .validate(value)
      .then(valid => {
        setErrors({ ...errors, [name]: '' })
      })
      .catch((err) => {
        setErrors({
          ...errors, [name]: err.errors[0]
        })
      })

    setFormState({
      ...formState,
      [name]: value
    })

  }

  useEffect(() => {

    formValidate.isValid(formState)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formState])
  //~~~~~~~~~~~~~~~~~~ END Validation~~~~~~~~~~~~~~~~~~ \\
  //start of checkbox change\\
  const onCheckboxChange = evt => {
    const { name } = evt.target
    const { checked } = evt.target
    setFormState({
      ...formState, [name]: checked,
    })

  }
  //~~~~~~~~~~~~~~~~~~end of checkbox change~~~~~~~~~~~~~~~~~~\\

  //~~~~~~~~~~~~~~~~~~start of onSubmit~~~~~~~~~~~~~~~~~~\\
  const onSubmit = evt => {
    // debugger
    evt.preventDefault() //prevents from refreshing
    const newUsername = {
      username: formState.username.trim(),
      email: formState.email.trim(),
      password: formState.password.trim(),
      instructions: formState.instructions,
    }
    postNewUsername(newUsername)



  }
  //~~~~~~~~~~~~~~~~~~start of on Login~~~~~~~~~~~~~~~~~~\\
  const onLogin = evt => {
    // debugger
    evt.preventDefault() //prevents from refreshing
    axios.post('https://cors-anywhere.herokuapp.com/https://saltiest-hacker-lambda.herokuapp.com/api/auth/login', formState)
      .then(res => console.log({ res }))
      .catch(err => console.log(err))



  }
  //~~~~~~~~~~~~~~~~~~ END of Submit ~~~~~~~~~~~~~~~~~~\\

  // start of return statement
  return (


    <div className="App">
      <header className="App-header">

        {/* Start of Home page nav links */}
        <Link to='/'>Login</Link>

        <Link to='/Form'>Register</Link>
        {/* End of Home page nav links */}


        {/* Start of Login */}
        <Route exact path='/' >
          <Login
            validateChange={validateChange}
            onCheckboxChange={onCheckboxChange}
            onSubmit={onSubmit}
            disabled={disabled}
            errors={errors}
            values={formState}
          />
        </Route>
        {/* end of Login */}


        {/* start of registration */}
        <Route exact path='/Form' >
          <Form

            validateChange={validateChange}
            onCheckboxChange={onCheckboxChange}
            onSubmit={onSubmit}
            disabled={disabled}
            errors={errors}
            values={formState}

          />
          {username.map(user => {
            return (
              <div key={user.id}>
                <h3> {user.username} </h3>
                <h3> {user.email} </h3>
              </div>
            )


          }
          )}
        </Route>
        {/* end of my registration */}


      </header>
    </div>

  )
}

export default App