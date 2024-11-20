import React, { useContext, useEffect, useState } from 'react'
import base_url from '../services/base_url'
import { updateProfileApi } from '../services/allApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextapi/AuthContext'

function Profile() {

    const [view, setView] = useState(false)
    const [details,setDetails]=useState({
        username:"",github:"",linkedin:"",profile:""
    })

    const[preview,setPreview]=useState("")
    const nav=useNavigate()

    const {setlogstatus}=useContext(logContext)

    useEffect(()=>{
        if(sessionStorage.getItem('user')){
            setDetails({
                username:sessionStorage.getItem('user'),
                github:sessionStorage.getItem('github'),
                linkedin:sessionStorage.getItem('linkedin'),
                profile:sessionStorage.getItem('profile')
            })
        }
    },[])

    useEffect(()=>{
        if(details.profile.type){
            setPreview(URL.createObjectURL(details.profile))
        }
        else{
            setPreview("")
        }
    },[details.profile])

    const changeView = () => {
        setView(!view)
    }

    const changeStatus =()=>{
        setView(!view)
    }

  

    const handleUpdate=async()=>{
        console.log(details)
        const {username,github,linkedin,profile}=details
        if(!username || !github || !linkedin || !profile){
            toast.warning("Enter Valid Inputs")
        }
        else{
            if(profile.type){
                const fd=new FormData()
                fd.append('username',username)
                fd.append('github',github)
                fd.append('linkedin',linkedin)
                fd.append('profile',profile)

                const header={
                    'Content-Type':"multipart/form-data",
                    'Authorization':`Token ${sessionStorage.getItem('token')}`
                }
                const result=await updateProfileApi(header,fd)
                if(result.status==200){
                    toast.success("Profile Updation Successful!!!")
                    nav('/auth')
                    setlogstatus(false)
                    sessionStorage.clear()
                }
                else{
                    toast.error("Profile Updation Failed!!!")
                }
            }
            else{
                const header={
                    'Content-Type':"application/json",
                    'Authorization':`Token ${sessionStorage.getItem('token')}`
                }
                const result=await updateProfileApi(header,details)
                if(result.status==200){
                    toast.success("Profile Updation Successful!!!")
                    nav('/auth')
                    setlogstatus(false)
                    sessionStorage.clear()
                }
                else{
                    toast.error("Profile Updation Failed!!!")
                }
            }
        }
    }

    return (
        <>
            <div className='w-100 p-2 border mt-3 border-3'>
                <div className='d-flex justify-content-between'>
                    <h4>Profile Updation</h4>
                    <button className='btn' onClick={changeView}>
                        {
                            view ?
                                <i className="fa-solid fa-chevron-up" />
                                :
                                <i className="fa-sharp fa-solid fa-chevron-down" />
                        }
                    </button>
                </div>
                {
                    view &&
                    <div className=''>
                        <label className='d-flex justify-content-center'>
                            <input type="file" onChange={(e)=>setDetails({...details,profile:e.target.files[0]})} name='' style={{ display: 'none' }} id='' />
                            <img src={preview?preview:details.profile !== "undefined"?`${base_url}/uploads/${details.profile}`:"https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"} className='img-fluid' alt="profile" />
                        </label>
                        <input type="text" defaultValue={details.username} onChange={(e)=>setDetails({...details,username:e.target.value})} placeholder='Username' className='form-control mb-3' />
                        <input type="text" defaultValue={details.github} onChange={(e)=>setDetails({...details,github:e.target.value})} placeholder='GitHub Link' className='form-control mb-3' />
                        <input type="text" defaultValue={details.linkedin} onChange={(e)=>setDetails({...details,linkedin:e.target.value})} placeholder='LinkedIn Link' className='form-control mb-3' />
                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-success' onClick={handleUpdate}>Update</button>
                            <button className='btn btn-danger' onClick={changeStatus}>Cancel</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Profile