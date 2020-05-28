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
        favComments,
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
                console.log(res.data)
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

    const sortBySaltRating = (a, b) => {
        const commentA = a.score
        const commentB = b.score

        let comparison = 0

        if (commentA > commentB) {
            comparison = 1
        }
        else if (commentA < commentB) {
            comparison = -1
        }

        return comparison
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
                <button>🧂 by Hack News user</button>
                <button type="button" onClick={fetchComments}>Top 🧂</button>
            </form>
            <div className="top-comments">
                <h3>🧂 Saltiest Comments 🧂</h3>
                <ul>
                    {
                        commentList.length > 0

                            ?

                            commentList
                                .sort(sortBySaltRating)
                                .map((c, idx) => <CommentCard key={idx} comment={c} />)
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
                    {
                        favComments.length > 0
                            ?
                            favComments.map((c, idx) => <CommentCard key={idx} comment={c} />)
                            :
                            <li>
                                <h3>No Favorite Comments</h3>
                            </li>
                    }
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => {

    return {
        userInfo: state.appReducer.userInfo,
        commentList: state.appReducer.commentList,
        favComments: state.appReducer.favComments
    }
}

export default connect(mapStateToProps, { setUserInfo, fetchComments, searchUser })(UserDashboard)