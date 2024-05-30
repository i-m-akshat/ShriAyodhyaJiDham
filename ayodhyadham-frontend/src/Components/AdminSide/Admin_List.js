import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

function Admin_List() {
  const navigate=useNavigate();
    const [data,setData]=useState([]);
    const fetchlist=async()=>{
        const res=await fetch(process.env.REACT_APP_URL+'/manageAdmin/GetAllAdmin',{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await res.json();
setData(data);
    }
    const handleEdit=async(id)=>{
      navigate('./UpdateAdmin',{state:{id:id}});
    }
    const handleDelete=async(id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          const response=await fetch(`${process.env.REACT_APP_URL}/manageAdmin/DeleteAdmin/${id}`,{
            method:"PUT",
            headers:{
              "Content-Type":"application/json",
              sessionID:localStorage.sessionID,
              
            }
          })
          if(response.ok){
            Swal.fire({
              title: "Deleted!",
              text: "Admin has been deleted.",
              icon: "success",
              showConfirmButton: true,
              timer: 1500
            });
            fetchlist();
          }
          
        }
      });
    }
    useEffect(()=>{
        fetchlist();
    },[])
    return (
        <>
             <div className='container-fluid my-3 mx-3'>
           <div className='row align-items-center mb-3'>
            <div className='col'>
            <h5 className='text-black-50 text-start'>All Admins</h5>
            </div>
            <div className='col-auto'>
              <Link to='./AddAdmin' className=' btn-Round2'>Add Admin</Link>
            </div>
          </div>
            <table className="table">
      <thead>
        <tr>
          <th scope="col">SR No</th>
          <th scope="col">Admin Name</th>
          <th scope='col'>Full Name</th>
          <th scope='col'>Role Name</th>
          <th scope='col'> Actions
          </th>
         
        </tr>
      </thead>
      <tbody>
        {
           
           data.map((res,index)=>(
                <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{res.admin_name}</td>
                <td>{res.full_name}</td>
                <td>{res.role_name}</td>
                <td>
               
    <a className='btn btn-warning btn-sm mx-2' onClick={e=>handleEdit(res.admin_id)}><i className="fa-regular fa-pen-to-square mx-2"></i></a>
                <a className='btn btn-sm btn-danger mx-2' onClick={()=>handleDelete(res.admin_id)}><i className="fa-solid fa-trash mx-2"></i></a>
                </td>
                
              </tr>
           ))
        }
       
      </tbody>
    </table>
        </div>
        </>
       
      )
}

export default Admin_List