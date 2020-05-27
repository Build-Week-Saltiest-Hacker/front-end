import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = JSON.parse(localStorage.getItem('token'))

    return (
        <Route
            {...rest}
            render={() => token ? <Component /> : <Redirect to='/' />}
        />
    )
}

export default ProtectedRoute