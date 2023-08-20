import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, reset as notesReset } from '../features/notes/noteSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NoteItem from "../components/NoteItem"


function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.ticket)
    const { notes, isLoading: notesIsLoading } = useSelector((state) => state.note)
    const dispatch = useDispatch()
    const params = useParams()
    const { ticketId } = params
    const navigate = useNavigate()


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        //eslint-disable-next-line
    }, [isError, message, ticketId])

    if (isLoading) {
        return <Spinner />
    }
    if (isError) {
        return <h3>Something went Wrong</h3>
    }


    //Close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success("Ticket Closed")
        navigate("/tickets")
    }
    return (
        <div className='ticket-page'>
            <header className="ticket-header">
                <BackButton url={"/tickets"} />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>

                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                {notes.map((note) => (
                    <NoteItem key={note._id} note={note} />
                ))}
            </header>

            {ticket.status !== 'closed' && (
                <button className="btn btn-block btn-danger " onClick={onTicketClose}>Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket