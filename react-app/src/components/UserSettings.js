import React, { useState } from 'react'

//Redux
import { connect } from 'react-redux'

const UserSettings = props => {

    const {
        userInfo

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

    return (
        <div className="container">
            <form>
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

            </form>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.appReducer.userInfo
    }
}

export default connect(mapStateToProps, {})(UserSettings)