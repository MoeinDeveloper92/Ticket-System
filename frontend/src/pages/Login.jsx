import React, { useState } from 'react'
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"
function Login() {

    const [formData, setFormData] = useState({

        email: "",
        password: "",

    })
    //Destructure properties from formData
    const { email, password } = formData


    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()


    }

    return (
        <>
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
        </>
    )
}

export default Login