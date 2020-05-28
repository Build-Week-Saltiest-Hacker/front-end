import React from 'react'
import { Link } from 'react-router-dom'

//Redux
import { connect } from 'react-redux'
import { clearUserInfo } from '../store/actions/index'

const Navbar = props => {

    const {
        userInfo,
        clearUserInfo

    } = props

    const logOut = () => {
        window.localStorage.removeItem('loggedIn')
        window.localStorage.removeItem('token')
        clearUserInfo()
    }

    return (
        <nav className="navbar">
            <h2>Salty Trolls</h2>
            {userInfo && <h2>Welcome, {userInfo.username}</h2>}
            <Link onClick={logOut} to="/">{userInfo ? 'Log Out' : 'Log In'}</Link>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.appReducer.userInfo
    }
}

export default connect(mapStateToProps, { clearUserInfo })(Navbar)