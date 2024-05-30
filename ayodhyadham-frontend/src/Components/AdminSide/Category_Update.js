import React, { useEffect } from 'react'
import { useLocation,Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

function Category_Update() {
  const navigate=useNavigate();
  const [category, setcategory] = useState('');
  const location = useLocation();
  const id=location.state.id;
  console.log(id);
  const fetchCategoryById=async(id)=>{
    const response=await fetch(`http://localhost:7000/manageCategory/SelectCategory/${id}`,{
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
        console.log(data[0].category_name);
        setcategory(data[0].category_name);
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
      const response=await fetch(`http://localhost:7000/manageCategory/UpdateCategory/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          sessionID:localStorage.sessionID
        },
        body:JSON.stringify({category})
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
          text: "Category has been Updated.",
          icon: "success",
          showConfirmButton: true,
          timer: 1500
        });
        setcategory('');
        navigate('../');
      }
    }
    
  }
  useEffect(()=>{
    fetchCategoryById(id);
  },[])
  return (
    <div className='container p-3 mt-3'>
      <div className='row align-items-center mb-3'>
        <div className='col'>
          <h5 className='text-black-50 text-start'>Update category</h5>
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
                <input type="text" value={category} class="form-control" onChange={e => setcategory(e.target.value)} id="txtCategoryName" placeholder="Please Enter the Category Name" />
                <label for="txtCategoryName">Category Name</label>
              </div>
              <div className='row justify-content-center align-items-center mt-4'>
                <center><a role='button' className='btn-Round2' onClick={handleUpdate}>Update Category</a></center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category_Update