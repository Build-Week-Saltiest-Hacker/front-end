import React from 'react'

const SaltRating = ({ score }) => {

    return (
        <div className="salt-rating">
            <p className="">🧂 {`${Math.floor(Math.abs(score * 100))}%`}</p>
        </div>
    )
}

export default SaltRating