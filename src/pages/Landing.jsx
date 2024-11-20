import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { allprojectApi } from '../services/allApi'

function Landing() {


    const [logstatus, setlogstatus] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setlogstatus(true)
        }
        else {
            setlogstatus(false)
        }
        getData()
    }, [])

    const getData = async () => {
        const res = await allprojectApi()
        if (res.status == 200) {
            setData(res.data)
        }
    }
    console.log(data)



    return (
        <>
            <div className='container-fluid d-flex justify-content-center align-items-center bg-secondary' style={{ height: '90vh' }}>
                <Row>
                    <Col className='d-flex flex-column justify-content-center'>
                        <h3 className='text-warning'>Project-Fair</h3>
                        <p style={{ textAlign: 'justify' }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat debitis sequi eum enim cum dolorum nisi voluptate aut, ipsum mollitia beatae quo aliquid in ipsa est quia nihil? Eligendi, nam?</p>
                        <div className='d-grid'>

                            {
                                logstatus ?
                                    <Link to={'/dash'} className='btn btn-warning' >Go to Dashboard</Link>
                                    :
                                    <Link to={'/auth'} className='btn btn-primary mt-3'>Start To Explore</Link>
                            }
                        </div>
                    </Col>
                    <Col>
                        <img src="https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_640.png" alt="" className='img-fluid' />
                    </Col>
                </Row>
            </div>
            <h2 className='text-center mb-4 mt-4'>Sample Projects</h2>

            {
                data.length > 0 ?
                    <div className='d-flex justify-content-around mb-4'>
                        {
                            data.slice(0, 3).map(item => (
                                <ProjectCard project={item} />
                            ))
                        }

                    </div>
                    :
                    <h3 className='my-3 text-center text-danger'>No Projects Availble</h3>
            }

            <h3 className='text-center'><Link to={'/projects'}>View More</Link></h3>
        </>
    )
}

export default Landing