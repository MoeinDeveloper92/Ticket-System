import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import NewTicket from './pages/NewTicket'
import PrivateRoute from './components/PrivateRoute'
import Tickets from './pages/Tickets'
function App() {

  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/new-ticket' element={<PrivateRoute />}>
          <Route path='/new-ticket' element={<NewTicket />} />
        </Route>
        <Route path='/tickets' element={<PrivateRoute />}>
          <Route path='/tickets' element={<Tickets />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App