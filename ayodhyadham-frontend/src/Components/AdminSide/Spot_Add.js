import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function Spot_Add() {
  // const [data, setData] = useState({
  //   category_id: "",
  //   spot_name: "",
  //   isactive: false,
  //   icon_image: '',
  //   banner_image: '',
  //   longitude: '',
  //   lattitude: '',
  //   showonhomepage: false,
  //   full_description: '',
  //   short_description: ''
  // });
  // const [category_id,setCategory]=useState('');
  const [spot_name, setSpotName] = useState('');
  const [icon_image, setIconImage] = useState();
  const [icon_imageUrl,setIconImageUrl]=useState();
  const[banner_imageUrl,setBannerImageURL]=useState();
  const [banner_image, setBannerImage] = useState();
  const [longitude, setLongitude] = useState('');
  const [lattitude, setlattitude] = useState('');
  const [showonhomepage, setShowOnHomePage] = useState(false);
  const [short_description, setShortDesc] = useState('');
  const [full_description, setFullDesc] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(0);
  const [dropData, setDropData] = useState([]);
  const fetchList_Category = async () => {
    
    fetch('http://localhost:7000/manageCategory/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result => {
      result.json().then(data => {
        setDropData(data);
      });

    })

  }


  const handleAdd = async (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append('iconImage',icon_image);
    formData.append('iconImageName',icon_image.name);
    formData.append('bannerImage',banner_image);
    formData.append('bannerImageName',banner_image.name);
    formData.append('spot_name', spot_name);
    formData.append('longitude', longitude);
    formData.append('latitude', lattitude);
    formData.append('showonhomepage', showonhomepage);
    formData.append('short_description', short_description);
    formData.append('full_description', full_description);
    formData.append('category_id', selectedOptions);
    // console.log(formData)
    const response=await fetch('http://localhost:7000/manageSpot/AddSpots',
    {
      method:"POST",
      headers:{
        //'Content-Type':'application/json',
        sessionID: localStorage.sessionID,
      },
      body:formData
    })
    if(response.status===200){
      const data=await response.json();
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
          text: "Spot has been Added.",
          icon: "success",
          showConfirmButton: true,
          timer: 1500
        });
        cleardata();
      }
    }else if(response.status===403){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: await response.json(),
        showConfirmButton: true,
        timer: 1500
      });
    }else if(response.status===500){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: await response.json(),
        showConfirmButton: true,
        timer: 1500
      });
    }
    
    
  }
const cleardata=()=>{
  setSpotName('');
      setIconImage('');
      setIconImageUrl();
      setBannerImage('');
      setBannerImageURL();
      setLongitude('');
      setlattitude('');
      setShowOnHomePage(false);
      setShortDesc('');
      setFullDesc('');
      setSelectedOptions(0);
}
const validate=()=>{
  let error='';
 
}
  //method to hanle changes in dropdown
  const handleDropChange = (e) => {
    console.log(e.target.value);
    setSelectedOptions(e.target.value)
  }
  useEffect(() => {
    fetchList_Category();

  }, [])
  return (
    <div className='container p-3 mt-3'>
      <div className='row align-items-center mb-3'>
        <div className='col'>
          <h5 className='text-black-50 text-start'>Add Spot</h5>
        </div>
        <div className='col-auto'>
          <Link to='../' className='btn-Round2'>Back to List</Link>
        </div>
      </div>
      <div className='row justify-content-center align-items-center mt-3'>
{/* <form action='/AddSpots' method="post" enctype="multipart/form-data">  */}
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <select value={selectedOptions} onChange={handleDropChange} className='form-control' id='ddlCategory' placeholder='Please Select the Category'>
                      <option value="0" >Please select the Category</option>
                      {
                        dropData.map((data) => (
                          <option key={data.category_id} value={data.category_id}>
                            {data.category_name}
                          </option>
                        ))
                      }
                    </select>
                    <label for='ddlCategory'>Category</label>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <input type="text" class="form-control" value={spot_name} onChange={e => setSpotName(e.target.value)} id="txtSpotName" placeholder="Please Enter the Spot Name" />
                    <label for="txtSpotName">Spot Name</label>
                  </div>
                </div>

              </div>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                  
                    <input type="file" class="form-control"  onChange={e => {
                      if(e.target.files[0]!=null){
                        setIconImageUrl(URL.createObjectURL(e.target.files[0]));
                        setIconImage((e.target.files[0]))
                      }
                     
                      }} name='iconImage' id="imgIcon" placeholder="Please Select the Icon Image for the Spot" />
                     {
                      (icon_imageUrl!=null?<img src={icon_imageUrl} className='mt-3' height={100} width={200}/>:<br/>)
                     }
                        
                      
                    
                    <label for="imgIcon">Icon Image</label>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                 
                    <input type="file" class="form-control"  id="imgBanner"  name='bannerImage'  onChange={e => {
                      if(e.target.files[0]!=null){
                      setBannerImage((e.target.files[0]));
                      setBannerImageURL(URL.createObjectURL(e.target.files[0]))}
                      }} placeholder="Please Select the Banner Image for the Spot" />
                      {
                        (banner_imageUrl!=null? <img src={banner_imageUrl} className='mt-3' height={100} width={200}/>:<br/>)
                       
                      }
                    
                    <label for="imgBanner">Banner Image</label>
                  </div>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <input type='text' class='form-control' id='txtLongitude' value={longitude} onChange={e => setLongitude(e.target.value)} placeholder='Please enter the longitude'></input>
                    <label for='txtLongitude'>Longitude</label>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <input type='text' class='form-control' id='txtLattitude' value={lattitude} onChange={e => setlattitude(e.target.value)} placeholder='Please enter the lattitude'></input>
                    <label for='txtLattitude'>Lattitude</label>
                  </div>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <input type='text' class='form-control' value={short_description} onChange={e => setShortDesc(e.target.value)} id='txtShortDescription' placeholder='Please enter the Short Description'></input>
                    <label for='txtShortDescription'>Short Description</label>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <textarea type='text' multiple='true' class='form-control' value={full_description} onChange={e => setFullDesc(e.target.value)} id='txtLongDescription' placeholder='Please enter the Long Description of the Spot'></textarea>
                    <label for='txtLongDescription'>Long Description</label>
                  </div>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <div className='form-check mb-3'>
                    <input type='checkbox' class="form-check-input" id='chkShowOnHomePage' onChange={e => setShowOnHomePage(e.target.checked)} checked={showonhomepage} name='chkShowOnHomePage'></input>
                    <label for='chkShowOnHomePage'>Show On HomePage</label>
                  </div>
                </div>

              </div>
              <div className='row justify-content-center align-items-center mt-4'>
                <center><a role='button' className='btn-Round2' onClick={handleAdd}>Add Spot</a></center>
              </div>
            </div>

          </div>
        </div>
        {/* </form> */}
      </div>
    </div>

  )
}

export default Spot_Add