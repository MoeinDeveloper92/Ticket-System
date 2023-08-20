import React from 'react'
import { useAuthStatus } from '../hooks/useAuthState'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from './Spinner'

function PrivateRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus()

    if (checkingStatus) {
        return <Spinner />
    } else {
        return loggedIn ? <Outlet /> : <Navigate to={"/login"} />
    }
}
export default PrivateRoute