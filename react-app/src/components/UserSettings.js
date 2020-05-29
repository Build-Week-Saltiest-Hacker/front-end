import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//Redux
import { connect } from 'react-redux'
import { setUserInfo, clearUserInfo } from '../store/actions'

const UserSettings = props => {

    const { username } = useParams()

    const { push } = useHistory()

    const {
        userInfo,
        setUserInfo,
        clearUserInfo

    } = props

    const initialFormValues = {
        old: '',
        new: '',
        confirm: ''

    }

    /******************************* STATE *******************************/

    const [formValues, setFormValues] = useState(initialFormValues)

    /**************************** SIDE EFFECTS ****************************/
    //load user info on page load
    useEffect(() => {

        axiosWithAuth()
            .get(`/users/username=${username}`)
            .then(res => {
                setUserInfo(res.data)
            })
            .catch(err => console.log(err.respone))

    }, [username, setUserInfo])

    /****************************** CALLBACKS ******************************/

    const changeHandler = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //Check to see if new password and confirm password match
        if (formValues.new === formValues.confirm) {

            //attempt a login request with the username and old password
            axiosWithAuth()
                .post('/auth/login', { username: userInfo.username, password: formValues.old })
                //if successful then the old password field matched 
                //the password on the account
                .then(res => {
                    console.log('Password check was a success')
                    //prepare the object for the update
                    const updatedUser = {
                        username: userInfo.username,
                        email: userInfo.email,
                        password: formValues.confirm
                    }
                    //proceed to put() the changes to the server
                    axiosWithAuth()
                        .put(`/users/username=${username}`, updatedUser)
                        .then(res => {
                            console.log(res)
                        })
                        .catch(err => console.log(err.response))
                })
                .catch(err => console.log(err.response))
        }
        else console.log('Passwords do not match in the new and confirm fields')
    }

    const deleteAccount = e => {
        e.preventDefault()

        axiosWithAuth()
            .delete(`/users/username=${username}`)
            .then(res => {
                //remove logged in items from local storage
                window.localStorage.removeItem('loggedIn')
                window.localStorage.removeItem('token')

                //remove userInfo from state
                clearUserInfo()

                //push to login page
                push('/')

            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div className="container">
            <Link to={`/dashboard/${username}`}>Back to Dashboard</Link>

            <form className="update-form" onSubmit={onSubmit}>
                <h2>Update Password</h2>
                <label>Username:
                <p>{userInfo && userInfo.username}</p>
                </label>

                <label>Email:
                <p>{userInfo && userInfo.email}</p>
                </label>

                <label>Old Password:
                    <input
                        name="old"
                        type="password"
                        onChange={changeHandler}
                        value={formValues.old}
                    />
                </label>

                <label>New Password:
                    <input
                        name="new"
                        type="password"
                        onChange={changeHandler}
                        value={formValues.new}
                    />
                </label>

                <label>Confirm Password:
                    <input
                        name="confirm"
                        type="password"
                        onChange={changeHandler}
                        value={formValues.confirm}
                    />
                </label>

                <button>Update</button>
                <button className="delete-btn" type="button" onClick={deleteAccount}>Delete Account</button>

            </form>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.appReducer.userInfo
    }
}

export default connect(mapStateToProps, { setUserInfo, clearUserInfo })(UserSettings)