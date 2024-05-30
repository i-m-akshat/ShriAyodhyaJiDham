// import React, { useState } from 'react'
// import ShreeRamImage from '../assets/img/AyodhyaDham.png'
// import 'bootstrap/dist/js/bootstrap'
// import { Link } from 'react-router-dom'
// import './Navbar.css'

// function Navbar() {
//   const [isNavCollapsed,setCollapsed]=useState(true);
//   const navbarId=document.getElementById('collapsibleNavId');

//   // const toggle=()=>{
//   //   console.log(navbarId.classList);
//   //   // if(!isNavCollapsed){
//   //   //   navbarId.classList.remove('show');
//   //   //   setCollapsed(true);
      
//   //   // }else{
//   //   //   navbarId.classList.add('show');
//   //   //   setCollapsed(false);
//   //   // }
//   // }
//   return (
//     <>
//          <nav className="navbar navbar-expand-sm sticky-top">
//               <div className="container-fluid">
//                 <Link className="navbar-brand" to="/"><img src={ShreeRamImage} height="70" width="70"/></Link>
//                 <button className="navbar-toggler"  type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
//                   <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="collapsibleNavId">
//                   <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
//                     <li className="nav-item">
//                       <Link className="nav-link text-saffron" aria-current="page" to='/'>Home</Link>
//                     </li>
//                     <li className="nav-item">
//                       <a className="nav-link" href="#">Explore</a>
//                     </li>
//                     <li className="nav-item dropdown">
//                       <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                         Services
//                       </a>
//                       <ul className="dropdown-menu">
//                         <li><a className="dropdown-item" href="HotelBooking.html">Hotel Booking</a></li>
//                         <li><a className="dropdown-item" href="CabBooking.html">Cab Booking</a></li>
                      
//                       </ul>
//                     </li>
//                     <li className="nav-item dropdown">
//                       <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                         Media
//                       </a>
//                       <ul className="dropdown-menu">
//                         <li><a className="dropdown-item" href="#">Action</a></li>
//                         <li><a className="dropdown-item" href="#">Another action</a></li>
                      
//                       </ul>
//                     </li>
//                     <li className="nav-item dropdown">
//                       <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                         Events
//                       </a>
//                       <ul className="dropdown-menu">
//                         <li><a className="dropdown-item" href="#">Action</a></li>
//                         <li><a className="dropdown-item" href="#">Another action</a></li>
                      
//                       </ul>
//                     </li>
                   
//                     <li className="nav-item">
//                       <a className="nav-link" href="#">Blog</a>
//                     </li>
//                     <li className="nav-item">
//                       <a className="nav-link" href="#">Contact Us</a>
//                     </li>
//                   </ul>
//                   <ul className='navbar-nav' style={{justifyContent:"end"}}>
//                   <li className="nav-item">
//                       <span className="nav-link " ><Link className='btnRound' style={{borderRadius:"20px",padding:"10px"}} to='/Login'>Login</Link></span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//     </>
//   )
// }

// export default Navbar
import React, { useState, useRef, useEffect } from 'react';
import ShreeRamImage from '../assets/img/AyodhyaDham.png';
import 'bootstrap/dist/js/bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isNavCollapsed, setNavCollapsed] = useState(true);
  const collapsibleNavRef = useRef(null);

  const handleNavCollapse = () => {
    setNavCollapsed(!isNavCollapsed);
  };

  const closeNav = () => {
    setNavCollapsed(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.navbar') && !isNavCollapsed) {
        setNavCollapsed(true);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isNavCollapsed]);

  useEffect(() => {
    const collapsibleNav = collapsibleNavRef.current;
    if (isNavCollapsed) {
      collapsibleNav.classList.remove('show');
    } else {
      collapsibleNav.classList.add('show');
    }
  }, [isNavCollapsed]);

  return (
    <nav className="navbar navbar-expand-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={ShreeRamImage} height="70" width="70" alt="Shree Ram" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="collapsibleNavId"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`}
          id="collapsibleNavId"
          ref={collapsibleNavRef}
        >
          <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-saffron" aria-current="page" to="/" onClick={closeNav}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/AllEvents' onClick={closeNav}>
                Events
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="HotelBooking.html" onClick={closeNav}>
                    Hotel Booking
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="CabBooking.html" onClick={closeNav}>
                    Cab Booking
                  </a>
                </li>
                <li>
                  <Link className='dropdown-item' to='https://eprasadam.shriayodhyajidham.in/' onClick={closeNav}>E-Prasadam</Link>
                  
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Media
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#" onClick={closeNav}>
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={closeNav}>
                    Another action
                  </a>
                </li>
              </ul>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Events
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#" onClick={closeNav}>
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={closeNav}>
                    Another action
                  </a>
                </li>
              </ul>
            </li> */}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={closeNav}>
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={closeNav}>
                Contact Us
              </a>
            </li>
          </ul>
          <ul className="navbar-nav" style={{ justifyContent: 'end' }}>
            <li className="nav-item">
              <span className="nav-link">
                <Link className="btnRound" style={{ borderRadius: '20px', padding: '10px' }} to="/Login" onClick={closeNav}>
                  Login
                </Link>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
