import React from 'react';


const CommentCard = props => {
    return (
        <li className="comment-card">
            <h3>{props.username}</h3>
            <p>{props.text}</p>

            {props.score ? (<p classname="salt-rating">{props.score}</p>) : null
            }
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