import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logContext } from '../contextapi/AuthContext';

function Header() {

    const {setlogstatus}=useContext(logContext)


    const nav=useNavigate()
    const handlelogout=async()=>{
        sessionStorage.clear()
        toast.info("User Logged out")
        setlogstatus(false)
        nav('/auth')
    }


    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                    <i className="fa-solid fa-diagram-project fa-xl" style={{color: "#74C0FC",}} />
                    {' '} 
                    Project-Fair
                    </Navbar.Brand>
                    <button className='btn btn-danger' onClick={handlelogout}>Logout</button>
                </Container>
            </Navbar>


        </>
    )
}
export default Header