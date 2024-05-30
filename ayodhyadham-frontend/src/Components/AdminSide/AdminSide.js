import React, { createContext, useContext } from 'react'
import Dashboard from './Dashboard'
import { Routes,Route } from 'react-router-dom'
import Swal from 'sweetalert2'
import AdminLogin from '../AdminLogin'
import { useEffect,useState } from 'react';
function AdminSide() {
  const [isAuthenticated,setAuthenticated]=useState(false);
  // const authContext=createContext();
  const setAuth=(boolean)=>{
    setAuthenticated(boolean);
  }
  const isAuth=async()=>{
  try {
    //getting the response from backend
    const response=await fetch('http://localhost:7000/verify/',{
      mode: 'no-cors',
      method:"GET",
      headers:{
        "token":localStorage.token
      }
    });
    if(response.status===403){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: await response.json()})
    }else{
      const data=await response.json();
      ///passing the result to setAuth function in which we are setting if the user is authenticated or not 
      (data===true)?setAuth(true):setAuth(false);
    }
   
  } catch (error) {
    console.error(error.message);
  }
  }
  useEffect(()=>{
    isAuth();
  },[])
  return (
    <div>
        <Routes>
            {/* <Route exact path='/' Component={AdminLogin}/>
            <Route exact path='/Dashboard/*' Component={Dashboard}/> */}
            <Route exact path='/*' Component={()=>!isAuthenticated?(<AdminLogin   setAuth={setAuth}/>):(<Dashboard  setAuth={setAuth}/>)}/>
            <Route exact path='/Dashboard/*' Component={()=>!isAuthenticated?(<AdminLogin setAuth={setAuth}/>):(<Dashboard  setAuth={setAuth}/>)}/>
        </Routes>
    </div>
  )
}

export default AdminSide