import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { searchProjectApi } from '../services/allApi'

function Allprojects() {

    const [data, setData] = useState([])
    const [key,setKey]=useState("")

    useEffect(() => {
        getData()
    }, [key])

    const getData = async () => {
        const res = await searchProjectApi(key)
        if (res.status == 200) {
            setData(res.data)
        }
    }

 

    console.log(data)

    return (
        <>
            <Header />
            <div className='container-fluid p-3'>
                <div className='d-flex justify-content-between'>
                    <h3>All Projects</h3>
                    <input type="text" onChange={(e)=>setKey(e.target.value)} placeholder='Serach With Languages' className='form-control w-25' />
                </div>
                <div>
                    <div className='d-flex flex-wrap justify-content-around'>



                        {
                            data.length > 0 ?
                                <>
                                    {data.map(item => (
                                        <ProjectCard project={item} />
                                    ))}
                                </>
                                :
                                <h2 className='mt-4 text-center text-danger'>No Availble Projets</h2>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default Allprojects