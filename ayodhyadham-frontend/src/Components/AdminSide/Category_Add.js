import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function Category_Add() {
  const [category, setcategory] = useState('');
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(category);
    if(category!=''){
      const response = await fetch('http://localhost:7000/manageCategory/AddCategory',{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          sessionID: localStorage.sessionID,
        },
        body: JSON.stringify( {category })
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
        text: "Category has been Added.",
        icon: "success",
        showConfirmButton: true,
        timer: 1500
      });
      setcategory('');
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
          <h5 className='text-black-50 text-start'>Add category</h5>
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
                <center><a role='button' className='btn-Round2' onClick={handleAdd}>Add Category</a></center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category_Add