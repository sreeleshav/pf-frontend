import React, { useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import base_url from '../services/base_url';
import { responseContext } from '../contextapi/ContextProvider';
import { toast } from 'react-toastify';
import { updateProjectApi } from '../services/allApi';

function Edit({ project }) {


    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        title: "", description: "", languages: "", github: "", demo: "", image: ""
    })

    const [preview, setPreview] = useState("")
    const { setResponse } = useContext(responseContext)

    useEffect(() => {
        setData({...project })
    },[])

    useEffect(() => {
        if (data.image.type) {
            setPreview(URL.createObjectURL(data.image))
        }
        else {
            setPreview("")
        }
    }, [data.image])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = async () => {
        console.log(data)
        const { title, description, languages, github, demo, image } = data
        if (!title || !description || !languages || !github || !demo || !image) {
            toast.warning("Invalid Inputs")
        }
        else {
            if (data.image.type) {
                const fd = new FormData()
                fd.append("title", data.title)
                fd.append("description", data.description)
                fd.append("languages", data.languages)
                fd.append("github", data.github)
                fd.append("demo", data.demo)
                fd.append("image", data.image)


                const header = {
                    'Content-Type': "multipart/form-data",
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res = await updateProjectApi(project._id, header,fd)
                console.log(res)
                if (res.status == 200) {
                    toast.success("Project Details Updated")
                    handleClose()
                    setResponse(res)
                }
                else {
                    toast.error("Failed to update project")
                }
            }
            else {
                const header = {
                    'Content-Type': "application/json",
                    'Authorization': `Token ${sessionStorage.getItem('token')}`
                }
                const res = await updateProjectApi(project._id, header, data)
                console.log(res)
                if (res.status == 200) {
                    toast.success("Project Details Updated")
                    handleClose()
                    setResponse(res)
                }
                else {
                    toast.error("Failed to update project")
                }
            }
        }
    }


    return (
        <>
            <Button variant="btn" onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square fa-xl" style={{ color: "#63E6BE", }} />
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={(e)=>{setData({...data,image:e.target.files[0]})}} />
                                <img src={preview ? preview : `${base_url}/uploads/${data.image}`} className='img-fluid' alt="" />
                            </label>
                        </Col>
                        <Col>
                            <input type="text" defaultValue={data.title} onChange={(e) => { setData({ ...data, title: e.target.value }) }} placeholder='Project Name' className='form-control mb-2' />
                            <input type="text" defaultValue={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} placeholder='Description' className='form-control mb-2' />
                            <input type="text" defaultValue={data.languages} onChange={(e) => { setData({ ...data, languages: e.target.value }) }} placeholder='Language Used' className='form-control mb-2' />
                            <input type="text" defaultValue={data.github} onChange={(e) => { setData({ ...data, github: e.target.value }) }} placeholder='Git Respositary Link' className='form-control mb-2' />
                            <input type="text" defaultValue={data.demo} onChange={(e) => { setData({ ...data, demo: e.target.value }) }} placeholder='Demo Link' className='form-control mb-2' />

                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleEdit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit