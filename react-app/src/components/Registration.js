import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import formValidate from './FormValidate'
import { useLocalStorage } from '../hooks/useLocalStorage'

//start of my Form\\
export default function Form() {

    const { push } = useHistory()

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

    const initialDisabled = true
    //~~~~~~~~~~~~~~~~~~STATES~~~~~~~~~~~~~~~~~~\\
    const [disabled, setDisabled] = useState(initialDisabled)
    const [formState, setFormState] = useLocalStorage('formValues', initialFormState);
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    // const [disabled, setDisabled] = useState(initialDisabled)
    // const [formState, setFormState] = useState(initialFormState)
    const [errors, setErrors] = useState(initialError)
    //~~~~~~~~~~~~~~~~~~start of post~~~~~~~~~~~~~~~~~~\\

    const postNewUsername = newUsername => {

        axios.post('https://saltiest-hacker-lambda.herokuapp.com/api/auth/register/', newUsername)
            .then(res => {
                setFormState(initialFormState)
                push('/')
            })
            .catch(err => {
                console.log(err)
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
    //~~~~~~~~~~~~~~~~~~ start of checkbox chang~~~~~~~~~~~~~~~~~~ e\\
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

        }
        postNewUsername(newUsername)



    }

    return (

        <form className='form container' onSubmit={onSubmit}>
            <div>
                <h2>Registration page </h2>


                <h4> Register your account here</h4>
                {/* rendering validation errors here */}
                <div className='errors'>
                    {/* RENDER THE VALIDATION ERRORS HERE */}
                    <div>{errors.username}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                </div>


                {/* end of validation */}
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

                {/* email */}

                <div>
                    <label>Email&nbsp;

                       <input
                            name='email'
                            type='text'
                            value={formState.email}
                            onChange={validateChange}
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
                {/* TOS */}
                <div>

                    <label>Terms Of Service&nbsp;
                    <input
                            type='checkbox'
                            name='TOS'
                            checked={formState.TOS}
                            onChange={onCheckboxChange}
                        // add onChangefunction to app js and call it back later
                        />
                    </label>
                </div>

                {/* Submit Button */}

                <button disabled={disabled}> Submit </button>
                <Link to="/">
                    <button type="button">
                        Already a user?
                </button>
                </Link>
            </div>
        </form>

    )
}

        //end of my form\\