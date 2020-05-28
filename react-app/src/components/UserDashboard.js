import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//Redux
import { connect } from 'react-redux'
import { setUserInfo } from '../store/actions'

const UserDashboard = props => {
    const { username } = useParams()

    const {
        setUserInfo

    } = props

    useEffect(() => {

        axiosWithAuth()
            .get(`/users/username=${username}`)
            .then(res => {
                setUserInfo(res.data)
            })
            .catch(err => console.log(err.respone))

    }, [username, setUserInfo])


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
        userInfo: state.appReducer.userInfo
    }
}

export default connect(mapStateToProps, { setUserInfo })(UserDashboard)