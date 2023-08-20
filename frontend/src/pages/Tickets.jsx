import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import TicketItem from '../components/TicketItem'


function Tickets() {
    const { tickets, isLoading, isError, isSuccess } = useSelector((state) => state.ticket)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getTickets())
        //clear state un unmount
    }, [dispatch])


    if (isLoading) {
        return <Spinner />
    }



    return (
        <>
            <BackButton url={"/"} />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem ticket={ticket} key={ticket._id} />
                ))}
            </div>
        </>
    )
}

export default Tickets