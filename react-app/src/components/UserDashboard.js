import React, { useState } from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../store/actions'

const UserDashboard = props => {

    const {
        token,
        isFetching,
        handleLogin

    } = props

    return (
        <div>

        </div>
    )
}

const mapStateToProps = state => {

    return {
        token: state.appReducer.token,
        isFetching: state.appReducer.isFetching
    }
}

export default connect(mapStateToProps, { handleLogin })(UserDashboard)