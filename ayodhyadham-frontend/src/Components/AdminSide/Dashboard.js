import React, { useContext, useEffect, useRef, useState } from 'react'
import ShreeRamImage from '../../assets/img/AyodhyaDham.png'
import Swal from 'sweetalert2'
import './Sidebar.css'
import MainForm from './MainForm'
import { useNavigate } from 'react-router-dom'
function Dashboard(props) {
    const [isOpen, setIsOpen] = useState(true);
    // const [adminImage,setadminImage]=useState({ShreeRamImage})
    const [name, setName] = useState('');
    const navigate=useNavigate();
    const [role, setRole] = useState('');
    // const isAuthenticated=useContext(authContext);
    const sidebarRef = useRef(null);
    const adminMainRef = useRef(null);
    useEffect(()=>{
setName(localStorage.getItem('name'));
setRole(localStorage.getItem('role'));
    },[])
    const handleLogout=async(e)=>{
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to Logout!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const response=await fetch(process.env.REACT_APP_URL+'/manageAdmin/Logout',{
                    method:"GET",
                    headers:{
                        sessionID:localStorage.sessionID
                      }
                   
                });
                const data=await response.json();
                console.log(data);
                if(response.ok){
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    localStorage.removeItem('name');
                    localStorage.removeItem('sessionID');
                    props.setAuth(false);
                    Swal.fire({
                        icon: "success",
                        title: data,
                        showConfirmButton: true,
                        timer: 1500
                      });
                }
            }
          });
        
       
        
    }
    const handleEvents=(e)=>{
        e.preventDefault();
        if(localStorage.getItem('role')==='RootAdmin'){
            navigate('/Admin/Dashboard/Event');
        }
    }
    const handleSpot=(e)=>{
        e.preventDefault();
        if(localStorage.getItem('role')==='RootAdmin'){
            navigate('/Admin/Dashboard/Spot');
        }
    }
    const handleCat=(e)=>{
        e.preventDefault();
        if(localStorage.getItem('role')==='RootAdmin'){
            navigate('/Admin/Dashboard/Category');
        }
    }
    const handleRole=(e)=>{
        e.preventDefault();
        if(localStorage.getItem('role')==='RootAdmin'){
            navigate('/Admin/Dashboard/Role');
        }
    }
    const navigateDashboard=(e)=>{
        e.preventDefault();
        navigate('/Admin/Dashboard');
    }
    const handleAdmin=(e)=>{
        e.preventDefault();
        navigate('/Admin/Dashboard/Admin')
    }
    const handleSidebar = (e) => {
        e.preventDefault();
        const adminMain=adminMainRef.current;
        const sidebar=sidebarRef.current;
        if (!isOpen) {
            sidebar.style.left = "0px";
            adminMain.style.marginLeft = "300px";
            setIsOpen(true);
        } else {
            sidebar.style.left = "-300px";
            adminMain.style.marginLeft = "0px";
            setIsOpen(false);
        }

    }
    return (
        <div className="wrapper">
            <div className="sideBar" id="mySidebar" ref={sidebarRef}>

                <div className="profile">
                    <img src={ShreeRamImage} alt="profile_picture" />

                    <h3 className="profileName">{name}</h3>
                    <p className="profileDesc">{role}</p>
                </div>
                <ul className="sidebarList">
                    <li className="sidebarItem">
                        <a style={{ textDecoration: "none" }} onClick={handleCat}><i className="fa-solid fa-table-list"></i>Add Category</a>
                    </li>
                    <li className="sidebarItem">
                        <a style={{ textDecoration: "none"}} onClick={handleRole}> <i className="fa-solid fa-person-military-rifle"></i>Add Role</a>
                    </li>
                    <li className="sidebarItem">
                        <a style={{ textDecoration: "none"}} onClick={handleAdmin}><i className="fa-solid fa-user-tie"></i>Add Admin</a>
                    </li>

                    <li className="sidebarItem">
                        <a style={{ textDecoration: "none" }} onClick={handleSpot}><i className="fa-solid fa-location-dot"></i>Add Spot</a>
                    </li>
                    <li className="sidebarItem">
                        <a style={{ textDecoration: "none"  }} onClick={handleEvents}><i className="fa-solid fa-calendar-week"></i>Add Events</a>
                    </li>
                    <li className="sidebarItem">
                        <a style={{ textDecoration: "none" }}><i className="fa-solid fa-image"></i>Add Images</a>
                    </li>
                    <li className="sidebarItem">
                        <a style={{ textDecoration: "none" }}><i className="fa-solid fa-video"></i>Add Videos</a>
                    </li>
                    <li className="sidebarItem">
                        <a style={{ textDecoration: "none"}} type='button' onClick={handleLogout}><i className="fa-solid fa-person-walking-dashed-line-arrow-right"></i>Log Out</a>
                    </li>

                </ul>

            </div>
            <div className="adminBody" id="adminMain" ref={adminMainRef}>
                <nav className="navbar navbar-expand-lg" style={{ boxShadow: " 0 3px 15px white" }}>
                    <div className="container-fluid">
                        <a className="mx-2" type='button' id="btnSide" title="Admin Dashboard" onClick={handleSidebar}><i className="fa-solid fa-house"></i></a>
                        <a className="navbar-brand mx-2" style={{ fontSize: "25px",color: "#F25C05" }} onClick={navigateDashboard}>Admin Dashboard</a>
                        <button className="navbar-toggler" type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse " id="navbarSupportedContent">

                            <ul className="navbar-nav mb-2 mb-lg-0 me-auto ms-auto">
                            </ul>
                            <ul className="navbar-nav" style={{ marginRight: "40px" }}>
                                <li className="nav-item">
                                    <label className="nav-link" style={{ fontSize: "18px" ,color:"#F25C05"}}>Hello {name} </label>

                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link mx-4 " role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-user"></i>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item text-black" onClick={handleLogout}>Logout</a></li>
                                        <li><a className="dropdown-item text-black" href="#">Your Profile</a></li>

                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='container mt-5'>
                    <MainForm />
                </div>
            </div>
        </div>

    )
}

export default Dashboard