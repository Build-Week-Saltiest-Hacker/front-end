import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//Redux
import { connect } from 'react-redux'
import { setUserInfo, deleteUserAccount } from '../store/actions'

const UserSettings = props => {

    const { username } = useParams()

    const {
        userInfo,
        setUserInfo,
        deleteUserAccount

    } = props

    const initialFormValues = {
        username: '',
        email: '',
        old: '',
        new: '',
        confirm: ''

    }

    /******************************* STATE *******************************/

    const [formValues, setFormValues] = useState(initialFormValues)

    /**************************** SIDE EFFECTS ****************************/
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
    }

    const deleteAccount = e => {
        e.preventDefault()

        deleteUserAccount(userInfo.username)
    }

    return (
        <div className="container">
            <div className="user-details">
                {userInfo &&
                    <div>
                        <p>Username: {userInfo.username}</p>
                        <p>Email: {userInfo.email}</p>

                    </div>
                }
            </div>
            <form onSubmit={onSubmit}>
                <label>Username:
                    <input
                        name="username"
                        type="text"
                        onChange={changeHandler}
                        value={formValues.username}
                    />
                </label>

                <label>Email:
                    <input
                        name="email"
                        type="text"
                        onChange={changeHandler}
                        value={formValues.email}
                    />
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

                <label>Confirm New Password:
                    <input
                        name="confirm"
                        type="password"
                        onChange={changeHandler}
                        value={formValues.confirm}
                    />
                </label>

                <button>Submit</button>
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

export default connect(mapStateToProps, { setUserInfo, deleteUserAccount })(UserSettings)