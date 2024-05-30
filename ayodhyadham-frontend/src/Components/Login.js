import React, { useEffect } from 'react'
import ShreeRamImage from '../assets/img/AyodhyaDham.png'
import { Bars} from 'react-loader-spinner';
import { Hourglass} from 'react-loader-spinner';
import { useState } from 'react';

function Login() {
  const [loading, setLoading] = useState(true);
useEffect(()=>{
   // Simulate a loading time (e.g., fetching data)
   const timer = setTimeout(() => {
    setLoading(false);
  }, 1500); // Change this duration as needed

  return () => clearTimeout(timer);
},[])
  return (
    <div>
      {loading?(
        <div className='loader-container'>
           {/* <Bars className='text-center'
  height="80"
  width="80"
  radius="9"
  color="#F25C05"
  ariaLabel="three-dots-loading"
  wrapperStyle
  wrapperClass
/> */}
<Hourglass
  visible={true}
  height="80"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#F25C05', 'orange']}
  />
          </div>
       
      ):(<div className="_mainContent mt-2">
      <section className="vw-100 mt-5 ">
          <div className="container h-custom p-3 m-2">
            <div className="row containerLogin d-flex justify-content-center align-items-center">
              <div className="col-md-4 col-lg-6 col-xl-5 mb-4">
                <img src={ShreeRamImage}
                  className="img-fluid" alt="Sample image"/>
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 my-3">
                <form>
                
                  <div className="form-outline mb-4">
                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                      placeholder="Enter a valid email address" />
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                  </div>
        
                  
                  <div className="form-outline mb-3">
                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                      placeholder="Enter password" />
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                  </div>
        
                  <div className="d-flex justify-content-between align-items-center">
                  
                    <div className="form-check mb-0">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                      <label className="form-check-label" htmlFor="form2Example3">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-body">Forgot password?</a>
                  </div>
        
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn-Round2"
                      style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                        className="link-danger">Register</a></p>
                  </div>
        
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>)}
      
       
    </div>
  )
}

export default Login