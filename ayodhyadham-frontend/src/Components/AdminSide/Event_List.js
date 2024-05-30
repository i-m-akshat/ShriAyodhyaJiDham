import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
function Event_List() {
  const navigate=useNavigate();
const [data,setData]=useState([]);
const handleEdit=async(id)=>{
navigate('./UpdateEvent',{state:{id:id}});
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
      const response=await fetch(`${process.env.REACT_APP_URL}/manageEvent/DeleteEvent/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          sessionID:localStorage.sessionID,
          
        }
      })
      if(response.ok){
        Swal.fire({
          title: "Deleted!",
          text: "Event has been deleted.",
          icon: "success",
          showConfirmButton: true,
          timer: 1500
        });
        fetchEvents();
      }
      
    }
  });
}
  const fetchEvents=async()=>{
const response=await fetch(process.env.REACT_APP_URL+'/manageEvent/',{
  method:"GET",
  headers:{
    'content-type':'application/json'
  }
})
const data=await response.json();
console.log(data); 
setData(data);
  }


  useEffect(()=>{
    fetchEvents();
  },[])
  return (
    <div>
         <div className='container-fluid my-3 mx-3'>
        <div className='row align-items-center mb-3'>
        <div className='col'>
        <h5 className='text-black-50 text-start'>All Events</h5>
        </div>
        <div className='col-auto'>
          <Link to='./AddEvent' className='btn-Round2'>Add Event</Link>
        </div>
      </div>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">SR No</th>
      <th scope="col">Event Name</th>
      <th scope='col'>Icon Image</th>
      <th scope='col'> Actions
      </th>
     
    </tr>
  </thead>
  <tbody>
    {
       
    data.map((res,index)=>(
      <tr>
        <td>{index+1}</td>
        <td>{res.event_name}</td>
        <td><img src={`${process.env.REACT_APP_URL}/${res.icon_image}`
} height={100} width={200}/></td>
        <td>
        <a className='btn btn-warning btn-sm mx-2' onClick={e=>handleEdit(res.event_id)}><i className="fa-regular fa-pen-to-square mx-2"></i></a>
            <a className='btn btn-sm btn-danger mx-2' onClick={()=>handleDelete(res.event_id)}><i className="fa-solid fa-trash mx-2"></i></a>
        </td>
      </tr>

    ))
    }
   
  </tbody>
</table>
        </div>
        
    </div>
  )
}

export default Event_List