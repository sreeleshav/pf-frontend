import base_url from "./base_url";
import axios from "axios";
import commonApi from "./commonApi";

export const registerApi=async(data)=>{
    return await commonApi(`${base_url}/reg`,"POST","",data)
} 

export const loginApi=async(data)=>{
    return await commonApi (`${base_url}/log`,"POST","",data)
}

export const addProjectApi=async(data,header)=>{
    return await commonApi (`${base_url}/addproject`,"POST",header,data)
}

export const getProjectApi=async(header)=>{
    return await commonApi (`${base_url}/getproject`,"GET",header,"")
}

export const deleteProjectApi=async(id,header)=>{
    return await commonApi (`${base_url}/deletepro/${id}`,"DELETE",header,{})
}

export const updateProjectApi=async(id,header,data)=>{
    return await commonApi (`${base_url}/updatepro/${id}`,"PUT",header,data)
}

export const updateProfileApi=async(header,data)=>{
    return await commonApi (`${base_url}/updationprofile`,"PUT",header,data)
}

export const allprojectApi=async(keyword)=>{
    return await commonApi (`${base_url}/allprojects?search=${keyword}`,"GET","", "")
}

export const searchProjectApi=async(keyword)=>{
    return await commonApi (`${base_url}/search?search=${keyword}`,"GET","", "")
}