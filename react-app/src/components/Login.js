import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import formValidate from './FormValidate'

//start of my Form\\
export default function Login() {

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
    const [formState, setFormState] = useState(initialFormState);

    const [errors, setErrors] = useState(initialError);
    //~~~~~~~~~~~~~~~~~~start of post~~~~~~~~~~~~~~~~~~\\

    const postNewUsername = newUsername => {

        axios.post('https://cors-anywhere.herokuapp.com/https://saltiest-hacker-lambda.herokuapp.com/api/auth/login', newUsername)
            .then(res => {
                console.log(res)
            })
            .catch(err => {

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
        const { name, checked } = evt.target
        setFormState({
            ...formState, [name]: checked,
        })

    }
    //~~~~~~~~~~~~~~~~~~end of checkbox change~~~~~~~~~~~~~~~~~~\\

    //~~~~~~~~~~~~~~~~~~start of onSubmit~~~~~~~~~~~~~~~~~~\\
    const onSubmit = evt => {
        // debugger
        evt.preventDefault() //prevents from refreshing
        postNewUsername(formState)

    }



    return (

        <form className='form container' onSubmit={onSubmit}>
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
                            // value={values.username}
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
                            // value={values.password}
                            onChange={validateChange}

                        />
                    </label>
                </div>


                {/* Submit Button */}

                <button
                    name='login'
                    type='button'
                > Login
                </button>


                <Link to="/registration">
                    <button type="button">
                        Not registered?
                    </button>
                </Link>



            </div>
        </form>

    )
}

        //end of my form\\