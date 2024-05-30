import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function Role_Add() {
  const [role, setRole] = useState('');
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(role);
    if(role!=''){
      const response = await fetch(process.env.REACT_APP_URL+'/manageRole/AddRole',{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          sessionID: localStorage.sessionID,
        },
        body: JSON.stringify( {role })
      })
      const data = await response.json();
    console.log(data);
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
        title: "Added!",
        text: "Role has been Added.",
        icon: "success",
        showConfirmButton: true,
        timer: 1500
      });
      setRole('');
    }
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Fill the textbox!",
        showConfirmButton: true,
        timer: 1500
      });
    }
    
    

  }
  return (
    <div className='container p-3 mt-3'>
      <div className='row align-items-center mb-3'>
        <div className='col'>
          <h5 className='text-black-50 text-start'>Add Role</h5>
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
                <center><a role='button' className='btn-Round2' onClick={handleAdd}>Add Role</a></center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Role_Add