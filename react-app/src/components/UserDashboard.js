import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLogin } from '../store/actions'

const UserDashboard = props => {
    const { username } = useParams()

    const {
        userInfo,
        isFetching,
        handleLogin

    } = props

    useEffect(() => {
        console.log('set user info into state')

    }, [])


    return (
        <div className="container">
            <pre>Welcome, {username}</pre>

            <form>
                <label> Search by user:<br></br>
                    <input type="text" placeholder="Mine for salt" />
                </label>
                <button>🧂</button>
            </form>
            <div>
                <h3>Saltiest Comments</h3>
            </div>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        userInfo: state.appReducer.userInfo,
        isFetching: state.appReducer.isFetching
    }
}

export default connect(mapStateToProps, { handleLogin })(UserDashboard)