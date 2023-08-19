import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { reset, login } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"
import Spinner from '../components/Spinner'
function Login() {
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    //Destructure properties from formData
    const { email, password } = formData

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (user || isSuccess) {
            navigate("/")
        }

        dispatch(reset)
    }, [isLoading, isError, isSuccess, navigate, dispatch])

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(login(userData))

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
                    <FaSignInAlt />Login
                </h1>
                <p>Please Register to your Account!</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>

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
                        <button className="btn btn-block" type='submit'>
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </motion.div>
    )
}

export default Login