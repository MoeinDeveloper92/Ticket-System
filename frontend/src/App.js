import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import NewTicket from './pages/NewTicket'
import PrivateComponent from './components/PrivateComponent'
function App() {

  return (
    <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='' element={<PrivateComponent />}>
          <Route path='/new-ticket' element={<NewTicket />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App