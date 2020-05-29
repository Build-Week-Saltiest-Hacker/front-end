import React from 'react';
import { useParams } from 'react-router-dom'
import SaltRating from './SaltRating'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//Redux
import { connect } from 'react-redux'
import { saveComment } from '../store/actions'


const CommentCard = props => {

    const {
        comment,
        favorite,
        favComments,
        saveComment

    } = props

    const { username } = useParams()

    const clickHandler = e => {
        console.log(comment)
        axiosWithAuth()
            .post(`/users/username=${username}/save`, comment)
            .then(res => {
                console.log('Saved a comment', res)
                saveComment(comment)
            })
            .catch(err => console.log(err.response))
    }

    return (

        <li className={favorite ? 'favorite comment-card' : 'comment-card'}>
            <h3>{comment.username}</h3>

            <SaltRating score={comment.score} />

            <p>{comment.text}</p>

            <button onClick={clickHandler}>Save</button>
        </li>
    )
}

const mapStateToProps = state => {
    return {
        favComments: state.appReducer.favComments
    }
}

export default connect(mapStateToProps, { saveComment })(CommentCard)













// blah code\\

// export default function commentCard(props) {

//     //props\\
//     const {
//         values,


//     } = props

//     const comments = [`test comment 1`, `test comment 2`]

//     return (
//         <div>
//             {comments.map((comment) =>
//                 (

//                     <div>
//                         <label>
//                             <input
//                                 value={values.comments[comment]}

//                                 name={comment}

//                             />
//                             {comment}
//                         </label>
//                     </div>

//                 ))}
//         </div>


//     );

// }
