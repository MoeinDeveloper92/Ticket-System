import React, { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { register, reset } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"
import Spinner from '../components/Spinner'
function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //Destructure properties from formData
    const { name, email, password, password2 } = formData


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        //Redirct when we loggedin
        if (isSuccess || user) {
            navigate("/")
        }
        //we reset everything
        dispatch(reset())

    }, [isLoading, isError, isSuccess, user, dispatch, message, navigate])

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error("Passwords don't match!!!")
        } else {
            const userData = {
                name,
                email,
                password
            }
            //call register funciton
            dispatch(register(userData))
        }
    }
    if (isLoading) {
        return <Spinner />
    }
    return (
        <motion.div
            initial={{
                x: "-100%"
            }}
            animate={{
                x: "0"
            }}
        >
            <section className='heading'>
                <h1>
                    <FaUser />Register
                </h1>
                <p>Please Create An Account!</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id='name'
                            value={name}
                            name='name'
                            onChange={handleChange}
                            placeholder='Enter Name'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id='email'
                            value={email}
                            name='email'
                            onChange={handleChange}
                            placeholder='Enter Email'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id='password'
                            value={password}
                            name='password'
                            onChange={handleChange}
                            placeholder='Enter Password'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id='password2'
                            value={password2}
                            name='password2'
                            onChange={handleChange}
                            placeholder='Confirm Password'
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block" type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </motion.div>
    )
}

export default Register