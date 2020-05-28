import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'

import CommentCard from './CommentCard'

//Redux
import { connect } from 'react-redux'
import { setUserInfo, fetchComments, searchUser } from '../store/actions'

const UserDashboard = props => {

    const { username } = useParams()

    /******************************* PROPS *******************************/
    const {
        commentList,
        setUserInfo,
        fetchComments,
        searchUser

    } = props

    /******************************* STATE *******************************/

    const [searchInput, setSearchInput] = useLocalStorage('searchFor', '')

    /**************************** SIDE EFFECTS ****************************/
    useEffect(() => {

        axiosWithAuth()
            .get(`/users/username=${username}`)
            .then(res => {
                setUserInfo(res.data)
            })
            .catch(err => console.log(err.respone))

    }, [username, setUserInfo])

    useEffect(() => {
        fetchComments()

    }, [fetchComments])

    /****************************** CALLBACKS ******************************/

    const handleChange = e => {
        setSearchInput(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()

        searchUser(searchInput)

        setSearchInput('')

    }

    /******************************** JSX ********************************/
    return (
        <div className="container">
            <Link to={`/settings/${username}`}>Settings</Link>

            <form className="search-comments" onSubmit={onSubmit}>
                <label> Search by user:&nbsp;
                    <input
                        type="text"
                        placeholder="Mine for salt"
                        onChange={handleChange}
                        value={searchInput}
                    />
                </label>
                <button>🧂 by User</button>
                <button type="button" onClick={fetchComments}>Top 🧂</button>
            </form>
            <div className="top-comments">
                <h3>🧂 Saltiest Comments 🧂</h3>
                <ul>
                    {
                        commentList.length > 0

                            ?

                            commentList.map((c, idx) => <CommentCard key={idx} comment={c} />)
                            :

                            <li>
                                <h3>No Comments Found</h3>
                            </li>
                    }
                </ul>
            </div>
            <div className="fav-comments">
                <h3>My Favorite Comments</h3>
                <ul>

                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        userInfo: state.appReducer.userInfo,
        commentList: state.appReducer.commentList
    }
}

export default connect(mapStateToProps, { setUserInfo, fetchComments, searchUser })(UserDashboard)