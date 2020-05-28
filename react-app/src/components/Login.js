import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import * as yup from 'yup';
import loginValidate from './LoginValidate'
import { useLocalStorage } from '../hooks/useLocalStorage'

//start of my Form\\
function Login() {

    const { push } = useHistory()

    //start of consts\\ 
    const initialError = {
        username: '',

        password: '',

    }
    const initialFormState = {
        username: '',

        password: '',

    }
    const initialDisabled = true
    //~~~~~~~~~~~~~~~~~~STATES~~~~~~~~~~~~~~~~~~\\
    const [disabled, setDisabled] = useState(initialDisabled)
    const [formState, setFormState] = useLocalStorage('formValues', initialFormState);
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [errors, setErrors] = useState(initialError);
    //~~~~~~~~~~~~~~~~~~start of post~~~~~~~~~~~~~~~~~~\\

    const postNewUsername = newUsername => {

        axios.post('https://cors-anywhere.herokuapp.com/https://saltiest-hacker-lambda.herokuapp.com/api/auth/login', newUsername)
            .then(res => {

                //Get the username
                const username = newUsername.username

                //Set the token into local storage
                window.localStorage.setItem('token', JSON.stringify(res.data.token))

                //Reset formValues in local storage
                setFormState(initialFormState)

                //push to the user dashboard
                push(`/dashboard/${username}`)
            })
            .catch(err => {
                console.log(err.response)
                setIsLoggingIn(false)
            })

    }

    //~~~~~~~~~~~~~~~~~~ Event Handlers ~~~~~~~~~~~~~~~~~~\\
    //~~~~~~~~~~~~~~~~~~  Validation / Schema ~~~~~~~~~~~~~~~~~~ \\
    const validateChange = evt => {
        const name = evt.target.name
        const value = evt.target.value
        yup.reach(loginValidate, name)
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

        loginValidate.isValid(formState)
            .then(valid => {
                setDisabled(!valid)
            })
    }, [formState])
    //~~~~~~~~~~~~~~~~~~ END Validation~~~~~~~~~~~~~~~~~~ \\

    //~~~~~~~~~~~~~~~~~~start of onLogin~~~~~~~~~~~~~~~~~~\\
    const onLogin = evt => {
        // debugger
        evt.preventDefault() //prevents from refreshing
        setIsLoggingIn(true)
        postNewUsername(formState)

    }



    return (

        <form className='form container' onSubmit={onLogin}>
            <div>
                <h2>Welcome to the login page </h2>
                {/* rendering validation errors here */}
                <div className='errors'>
                    {/*  RENDER THE VALIDATION ERRORS HERE */}
                    <div>{errors.username}</div>
                    <div>{errors.password}</div>

                </div>

                {/* end of validation */}


                <h4> Login credentials</h4>

                {/* name  */}
                <div>
                    <label> UserName&nbsp;
              <input
                            name='username'
                            type='text'
                            value={formState.username}
                            onChange={validateChange}
                            placeholder='Your user name here..'
                        />
                    </label>
                </div>


                {/* password */}
                <div>
                    <label>Password&nbsp;

        <input
                            name='password'
                            type='password'
                            value={formState.password}
                            onChange={validateChange}

                        />
                    </label>
                </div>


                {/* Submit Button */}
                {isLoggingIn ?
                    <p>Logging In...</p> :

                    <div>

                        <button disabled={disabled}> login </button>


                        <Link to="/registration">
                            <button type="button">
                                Not registered?
                    </button>
                        </Link>

                    </div>
                }
            </div>
        </form>

    )
}

export default Login

        //end of my form\\