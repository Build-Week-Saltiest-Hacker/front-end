import React from 'react';
import SaltRating from './SaltRating'


const CommentCard = ({ comment }) => {

    return (
        <li className="comment-card">
            <h3>{comment.username}</h3>
            {
                comment.score ? <SaltRating score={comment.score} /> : null
            }
            <p>{comment.text}</p>
        </li>
    )
}
export default CommentCard













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