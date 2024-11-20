import { useContext, useState } from 'react'
import './bootstrap.min.css'
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Allprojects from './pages/Allprojects'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { logContext } from './contextapi/AuthContext'



function App() {

  const { logstatus } = useContext(logContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/dash' element={logstatus ? <Dashboard /> : <Auth />} />
        <Route path='/projects' element={logstatus ? <Allprojects /> : <Auth />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
