import React, { useEffect } from 'react'
import { useLocation,Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

function Role_Update() {
  const navigate=useNavigate();
  const [role, setRole] = useState('');
  const location = useLocation();
  const id=location.state.id;
  console.log(id);
  const fetchRoleById=async(id)=>{
    const response=await fetch(`${process.env.REACT_APP_URL}/manageRole/SelectRole/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":'application/json',
        sessionID:localStorage.sessionID
      }
    });
    if(!response){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: true,
        timer: 1500
      });
    }else{
      const data=await response.json();
      if(!data){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: true,
          timer: 1500
        });
      }else{
        console.log(data[0].role_name);
        setRole(data[0].role_name);
      }
    }
  }
  const handleUpdate=async()=>{
    if(!id){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: true,
        timer: 1500
      });
    }else{
      const response=await fetch(`${process.env.REACT_APP_URL}/manageRole/UpdateRole/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          sessionID:localStorage.sessionID
        },
        body:JSON.stringify({role})
      })
      const data=await response.json();
      if(!data){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: true,
          timer: 1500
        });
       
      }else{
        Swal.fire({
          title: "Updated !",
          text: "Role has been Updated.",
          icon: "success",
          showConfirmButton: true,
          timer: 1500
        });
        setRole('');
        navigate('../');
      }
    }
    
  }
  useEffect(()=>{
    fetchRoleById(id);
  },[])
  return (
    <div className='container p-3 mt-3'>
      <div className='row align-items-center mb-3'>
        <div className='col'>
          <h5 className='text-black-50 text-start'>Update Role</h5>
        </div>
        <div className='col-auto'>
          <Link to='../' className=' btn-Round2'>Back to List</Link>
        </div>
      </div>
      <div className='row justify-content-center align-items-center mt-3'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='form-floating mb-3'>
                <input type="text" value={role} class="form-control" onChange={e => setRole(e.target.value)} id="txtRoleName" placeholder="Please Enter the Role Name" />
                <label for="txtRoleName">Role Name</label>
              </div>
              <div className='row justify-content-center align-items-center mt-4'>
                <center><a role='button' className='btn-Round2' onClick={handleUpdate}>Update Role</a></center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Role_Update