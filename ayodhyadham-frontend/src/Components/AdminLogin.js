import React, { useEffect, useState } from 'react'
import ShreeRamImage from '../assets/img/AyodhyaDham.png'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
function AdminLogin(props) {
 
  const [userName,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    console.log(password);
    e.preventDefault();
    if(userName!='' && password!=''){
      const response=await fetch(process.env.REACT_APP_URL+'/manageAdmin/',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },body:JSON.stringify({adminName:userName,password:password})
      });
      console.log(response.status);
      if(response.status===200){
        const data=await response.json();
        if(data){
          console.log(data);
          localStorage.setItem('token',data.token);
          localStorage.setItem('name',data.name);
          localStorage.setItem('role',data.role);
          localStorage.setItem('sessionID',data.sessionID);
          props.setAuth(true);
          Swal.fire({
            icon: "success",
            title: "Login Successfull",
            showConfirmButton: true,
            timer: 1500
          });
          navigate('/Admin/Dashboard');
        }
      }else if(response.status===401){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: await response.json()
        });
      }else if(response.status===500){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: await response.json()
        });
      }else if(response.status===403){
         Swal.fire({
          icon: "error",
          title: "Oops...",
          text: await response.json()
        });
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: await response.json()
        });
      }
    }
  }
  return (
    <div className='py-5'>
      <h2 className='text-black-50 text-center'>Admin Login</h2>
       <div className="_mainContent pt-5">
                <section className="vw-100 pt-5">
                    <div className="container-fluid h-custom my-5">
                      <div className="row d-flex justify-content-center align-items-center my-2">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                          <img src={ShreeRamImage}
                            className="img-fluid " alt="Sample image"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 my-2">
                          <form>
                           
                            <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example3">Username</label>
                              <input type="text" id="form3Example3" value={userName} onChange={e=>setUsername(e.target.value)} className="form-control form-control-lg"
                                placeholder="Enter a valid Username" />
                            
                            </div>
                  
                           
                            <div className="form-outline mb-3">
                            <label className="form-label" htmlFor="form3Example4">Password</label>
                              <input type="password" id="form3Example4" value={password} onChange={e=>setPassword(e.target.value)} className="form-control form-control-lg"
                                placeholder="Enter password" />
                              
                            </div>
                  
                            <div className="d-flex justify-content-between align-items-center">
                            
                              <div className="form-check mb-0">
                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                <label className="form-check-label" htmlFor="form2Example3">
                                  Remember me
                                </label>
                              </div>
                              {/* <a href="#!" className="text-body">Forgot password?</a> */}
                            </div>
                  
                            <div className="text-center text-lg-start mt-4 pt-2">
                              <button type="button" className="btn-Round2"
                                style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}} onClick={handleSubmit}>Login</button>
                           
                            </div>
                  
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
    </div>
  )
}

export default AdminLogin