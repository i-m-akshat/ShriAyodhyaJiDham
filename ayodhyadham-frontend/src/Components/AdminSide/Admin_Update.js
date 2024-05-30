import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Admin_Update() {
    const location = useLocation();
    const [adminName, setAdminName] = useState('');
    const [fullname, setFullName] = useState('');
    const [eMail, setEmail] = useState('');
    const [mobileNo, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [stateId, setSelectedState] = useState('');
    const [cityId, setSelectedCity] = useState('');
    const [countryId, setSelectedCountry] = useState('');
    const [roleId, setSelectedRole] = useState('');
    const [pincode, setPincode] = useState('');
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [roles, setRoles] = useState([]);
    const id = location.state.id;
    console.log(id);
    const fetchAdminData = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/manageAdmin/SelectAdminById/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    sessionID: localStorage.sessionID
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setAdminName(data[0].admin_name);
            setFullName(data[0].full_name);
            setEmail(data[0].email);
            setMobile(data[0].mobileno);
            setAddress(data[0].address);
            setSelectedCountry(data[0].country_id);
            fetchStates(data[0].country_id);
            setSelectedState(data[0].state_id);
            fetchCities(data[0].state_id);
            setPincode(data[0].pincode);
            setSelectedRole(data[0].roleid);
            setSelectedCity(data[0].city_id);
            
            return data;
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    };

    const fetchRoles = async () => {
        fetch(process.env.REACT_APP_URL+'/manageRole/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => {
            result.json().then(data => {
                console.log(data);
                setRoles(data);
            });

        })
        //  const data=await result.json();
        //  console.log(data);
    }
    const fetchStates = async (id) => {
        fetch(`${process.env.REACT_APP_URL}/manageAdmin/GetStates/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => {
            result.json().then(data => {
                console.log(data);
                setStates(data);
            });

        })
    }
    const fetchCities = async (id) => {
        const response=await fetch(`${process.env.REACT_APP_URL}/manageAdmin/GetCities/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if(response.status===200){
            const data=await response.json();
            setCities(data);
        }else if(response.status===404){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: await response.json(),
                showConfirmButton: true,
                timer: 1500
              });
              setSelectedCity(0);
        }
    }
    const fetchCountries = async () => {
        fetch(process.env.REACT_APP_URL+'/manageAdmin/GetCountries', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => {
            result.json().then(data => {
                console.log(data);
                setCountries(data);
            });

        })
    }

    const handleRoleChange = (e) => {
        e.preventDefault();
        setSelectedRole(e.target.value)
    }
    const handleCountryChange = (e) => {
        e.preventDefault();
        setSelectedCountry(e.target.value);
        console.log(e.target.value);
        const id = parseInt(e.target.value);
        fetchStates(id);
    }
    const handleStateChange = (e) => {
        e.preventDefault();
        setSelectedState(e.target.value);
        const id = parseInt(e.target.value);
        console.log(id);
        fetchCities(id);
    }
    const handleCityChange = (e) => {
        e.preventDefault();
        setSelectedCity(e.target.value)
    }
    const handleUpdate = async () => {
        const result = await fetch(`${process.env.REACT_APP_URL}/manageAdmin/UpdateAdmin/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                sessionID: localStorage.sessionID,
            },
            body: JSON.stringify({ adminName, fullname, eMail, mobileNo, address, password, stateId, pincode, roleId, cityId, countryId })
        })
        if (result.status === 200) {
            const data = await result.json();
            console.log(data);
            if (!data) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    showConfirmButton: true,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: "Added!",
                    text: "Admin has been Updated.",
                    icon: "success",
                    showConfirmButton: true,
                    timer: 1500
                });
                cleardata();
            }
        } else if (result.status === 403) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: await result.json(),
                showConfirmButton: true,
                timer: 1500
            });
        } else if (result.status === 500) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: await result.json(),
                showConfirmButton: true,
                timer: 1500
            });
        }
    }

    const cleardata = () => {
        setAdminName('');
        setSelectedRole(0);
        setSelectedCountry(0);
        setSelectedCity(0);
        setFullName('');
        setPassword('');
        setAddress('');
        setEmail('');
        setMobile('');
    }
    useEffect(() => {
        fetchAdminData(id);
        fetchRoles();
        fetchCountries();

    }, [])
    return (
        <div className='container p-3 mt-3'>
            <div className='row align-items-center mb-3'>
                <div className='col'>
                    <h5 className='text-black-50 text-start'>Update Admin</h5>
                </div>
                <div className='col-auto'>
                    <Link to='../' className='btn-Round2'>Back to List</Link>
                </div>
            </div>
            <div className='row justify-content-center align-items-center text-black mt-3'>
                {/* <form action='/AddSpots' method="post" enctype="multipart/form-data">  */}
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-floating mb-3'>
                                        <select value={roleId} onChange={handleRoleChange} className='form-control' id='ddlRole' placeholder='Please Select the Spot'>
                                            <option value="0" >Please select the Role</option>
                                            {
                                                roles.map((data) => (
                                                    <option key={data.role_id} className='text-black' value={data.role_id}>
                                                        {data.role_name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor='ddlRole'>Role</label>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-floating mb-3'>
                                        <input type="text" className="form-control" value={adminName} onChange={e => setAdminName(e.target.value)} id="txtAdminName" placeholder="Please Enter the Event Name" />
                                        <label htmlFor="txtAdminName">Admin Name</label>
                                    </div>
                                </div>

                            </div>
                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-floating mb-3'>

                                        <input className="form-control" onChange={e => {
                                            setFullName(e.target.value)

                                        }} name='txtFullname' id="txtFullname" value={fullname} placeholder="Please Enter the full Name" />

                                        <label htmlFor="txtFullname">Full Name</label>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-floating mb-3'>

                                        <input className="form-control" value={password} id="txtPassword" name='txtPassword' onChange={e => {
                                            setPassword(e.target.value)
                                        }} placeholder="Please Enter the  Password" />

                                        <label htmlFor="txtPassword">Password</label>
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-floating mb-3'>
                                        <input type='text' className='form-control' value={address} onChange={e => setAddress(e.target.value)} id='txtShortDescription' placeholder='Please enter the Short Description'></input>
                                        <label htmlFor='txtAddress'>Address</label>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-floating mb-3'>
                                        <select value={countryId} onChange={handleCountryChange} className='form-control' id='ddlCountry' placeholder='Please Select the Country'>
                                            <option value="0" >Please select the Country</option>
                                            {
                                                countries.map((data) => (
                                                    <option key={data.country_id} className='text-black' value={data.country_id}>
                                                        {data.country_name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor='ddlCountry'>Country</label>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='row mb-2'>
               

              </div> */}
                            <div className='row mb-2'>
                                <div className='col-md-4'>
                                    <div className='form-floating mb-3'>
                                        <select value={stateId} onChange={handleStateChange} className='form-control' id='ddlState' placeholder='Please Select the State'>
                                            <option value="0" >Please select the State</option>
                                            {
                                                states.map((data) => (
                                                    <option key={data.state_id} className='text-black' value={data.state_id}>
                                                        {data.state_name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor='ddlState'>State</label>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-floating mb-3'>
                                        <select value={cityId} onChange={handleCityChange} className='form-control' id='ddlCity' placeholder='Please Select the City'>
                                            <option value="0" >Please select the City</option>
                                            {
                                                cities.map((data) => (
                                                    <option key={data.city_id} className='text-black' value={data.city_id}>
                                                        {data.city_name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor='ddlCity'>City</label>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='form-floating mb-3'>
                                        <input className='form-control' onChange={e => { setPincode(e.target.value) }} id='txtPincode' value={pincode} placeholder='please enter the pincode'></input>
                                        <label htmlFor='txtPincode'>Pincode</label>
                                    </div>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-md-6'>
                                    <div className='form-floating mb-3'>

                                        <input className="form-control" onChange={e => {
                                            setEmail(e.target.value)

                                        }} name='txtFullname' id="txtEmail" value={eMail} placeholder="Please Enter the EMail" />

                                        <label htmlFor="txtEMail">E Mail</label>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-floating mb-3'>

                                        <input className="form-control" value={mobileNo} id="txtMobileNo" name='txtMobileNo' onChange={e => {
                                            setMobile(e.target.value)
                                        }} placeholder="Please Enter the  Mobile No" />

                                        <label htmlFor="txtMobileNo">Mobile No</label>
                                    </div>
                                </div>
                            </div>
                            <div className='row justify-content-center align-items-center mt-4'>
                                <center><a role='button' className='btn-Round2' onClick={handleUpdate}>Update Admin</a></center>
                            </div>
                        </div>

                    </div>
                </div>
                {/* </form> */}
            </div>
        </div>
    )
}

export default Admin_Update