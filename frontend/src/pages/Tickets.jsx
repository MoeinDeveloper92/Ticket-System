import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getTickets, reset } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
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
        <div>
            <h1>Ticket</h1>
        </div>
    )
}

export default Tickets