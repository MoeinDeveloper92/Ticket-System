import React from 'react'
import { FaArrowAltCircleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"


function BackButton({ url }) {
    return (
        <Link className='btn btn-reverse btn-back' to={url}>
            <FaArrowAltCircleLeft />
        </Link>
    )
}

export default BackButton