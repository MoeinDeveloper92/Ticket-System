import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'


function NewTicket() {
    const { user } = useSelector((state) => state.auth)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState("iPhone")
    const [description, setDescription] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket)


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset())
            navigate("/tickets")
        }

        dispatch(reset())
    }, [isError, dispatch, navigate, isSuccess, message])
    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({
            product,
            description
        }))
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>  <BackButton url={"/"} />
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below.</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input type="text" disabled value={name} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Customer Email</label>
                    <input type="email" disabled value={email} className="form-control" />
                </div>

                <form onSubmit={onSubmit} >
                    <div className="form-group">
                        <label htmlFor="product">
                            Product
                        </label>
                        <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
                            <option value="iPhone">iPhone</option>
                            <option value="MacBook">MavBook Pro</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of Issue</label>
                        <textarea name="description" id="description" className='form-control' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NewTicket