import React, { useEffect, useState ,useRef} from 'react'
import Swal from 'sweetalert2';
import { Link,useNavigate } from 'react-router-dom';
function Role_List() {

  const navigate = useNavigate();
 
    const [data,setData]=useState([]);
    const fetchList=async()=>{
        fetch('http://localhost:7000/manageRole/',{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
         }).then(result=>{
           result.json().then(data=>{
            console.log(data);
            setData(data);
         });
           
         })
        //  const data=await response.json();
        //  console.log(data);
    }
    const handleEdit=(id)=>{
      navigate('./UpdateRole',{state:{id:id}});
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
      const response=await fetch(`http://localhost:7000/manageRole/DeleteRole/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          sessionID:localStorage.sessionID,
          
        }
      })
      if(response.ok){
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: true,
          timer: 1500
        });
        fetchList();
      }
      
    }
  });
}
   
    useEffect(()=>{
      fetchList();
    },[])
  return (
    <>
         <div className='container-fluid my-3 mx-3'>
       <div className='row align-items-center mb-3'>
        <div className='col'>
        <h5 className='text-black-50 text-start'>All Roles</h5>
        </div>
        <div className='col-auto'>
          <Link to='./AddRole' className=' btn-Round2'>Add Role</Link>
        </div>
      </div>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">SR No</th>
      <th scope="col">Role Name</th>
      <th scope='col'> Actions
      </th>
     
    </tr>
  </thead>
  <tbody>
    {
       
       data.map((res,index)=>(
            <tr>
            <th scope="row">{index+1}</th>
            <td>{res.role_name}</td>
            <td>
            {/* <Link
  className='btn btn-warning btn-sm mx-2'
  to={{ pathname: './UpdateRole', state: {id: res.Role_id} }}
>
  <i className="fa-regular fa-pen-to-square mx-2"></i>
</Link> */}
<a className='btn btn-warning btn-sm mx-2' onClick={e=>handleEdit(res.role_id)}><i className="fa-regular fa-pen-to-square mx-2"></i></a>
            <a className='btn btn-sm btn-danger mx-2' onClick={()=>handleDelete(res.role_id)}><i class="fa-solid fa-trash mx-2"></i></a>
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

export default Role_List