import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Navbar = ({ username }) => {

    const logOut = () => {
        window.localStorage.removeItem('loggedIn')
        window.localStorage.removeItem('token')
    }

    return (
        <nav className="navbar">
            <h2>Salty Trolls</h2>
            {username && <h2>Welcome, {username}</h2>}
            <Link onClick={logOut} to="/">{true ? 'Log Out' : 'Log In'}</Link>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        username: state.appReducer.username
    }
}

export default connect(mapStateToProps, {})(Navbar)