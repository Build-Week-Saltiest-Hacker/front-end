import React from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Navbar = props => {

    const [loggedIn] = useLocalStorage('loggedIn', null)

    const logOut = () => {
        window.localStorage.removeItem('loggedIn')
        window.localStorage.removeItem('token')
    }

    return (
        <nav className="navbar">
            <h2>Salty Trolls</h2>
            {/*username && <h2>Welcome, {username}</h2>*/}
            <Link onClick={logOut} to="/">{loggedIn ? 'Log Out' : 'Log In'}</Link>
        </nav>
    )
}

export default Navbar