import React from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../store/actions'

const UserDashboard = props => {

    const {
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
        isFetching: state.appReducer.isFetching
    }
}

export default connect(mapStateToProps, { handleLogin })(UserDashboard)