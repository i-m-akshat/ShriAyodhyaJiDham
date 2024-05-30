import React, { useEffect, useState } from 'react'
import { useLocation,Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';


function Spot_Update() {
  const navigate=useNavigate();
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
  const location = useLocation();
  const id=location.state.id;
  const fetchList_Category = async () => {
    
    fetch('http://localhost:7000/manageCategory/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(result => {
      result.json().then(data => {
        console.log(data);
        setDropData(data);
      });

    })

  }
  const fetchSpotByid=async(id)=>{
    const response=await fetch(`http://localhost:7000/manageSpot/GetSpotById/${id}`,{
      method:"GET",
      headers:{
        'content-type':'application/json'
      }
    })
    const data=await response.json();
    console.log(data);
    if(data[0]!=null){
      setBannerImage(data[0].banner_image);
      setIconImage(data[0].icon_image);
      setSpotName(data[0].spot_name);
      setSelectedOptions(data[0].category_id);
      setLongitude(data[0].longitude);
      setlattitude(data[0].lattitude);
      setFullDesc(data[0].full_description);
      setShortDesc(data[0].short_description);
      setShowOnHomePage(data[0].showonhomepage);
    }
  }
const handleUpdate=async(id)=>{
  const formData=new FormData();
  formData.append('iconImage',icon_image);
  formData.append('bannerImage',banner_image);
  formData.append('spot_name', spot_name);
  formData.append('longitude', longitude);
  formData.append('latitude', lattitude);
  formData.append('showonhomepage', showonhomepage);
  formData.append('short_description', short_description);
  formData.append('full_description', full_description);
  formData.append('category_id', selectedOptions);
  const response=await fetch(`http://localhost:7000/manageSpot/UpdateSpot/${id}`,{
    method:"PUT",
    headers:{
      sessionID:localStorage.sessionID
    }
    ,body:formData
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
        text: "Spot has been Updated.",
        icon: "success",
        showConfirmButton: true,
        timer: 1500
      });
      navigate('../');
    }
  }else if(response.status===403){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: await response.json(),
      showConfirmButton: true,
      timer: 1500
    });
  }
}
  //method to hanle changes in dropdown
  const handleDropChange = (e) => {
    console.log(e.target.value);
    setSelectedOptions(e.target.value)
  }
  useEffect(() => {
    fetchList_Category();
    fetchSpotByid(id);
  }, [])
  return (
    <div className='container p-3 mt-3'>
      <div className='row align-items-center mb-3'>
        <div className='col'>
          <h5 className='text-black-50 text-start'>Update Spot</h5>
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
                    <label htmlFor='ddlCategory'>Category</label>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <input type="text" className="form-control" value={spot_name} onChange={e => setSpotName(e.target.value)} id="txtSpotName" placeholder="Please Enter the Spot Name" />
                    <label htmlFor="txtSpotName">Spot Name</label>
                  </div>
                </div>

              </div>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                  
                    <input type="file" className="form-control"  onChange={e => {
                      if(e.target.files[0]!=null){
                        setIconImageUrl(URL.createObjectURL(e.target.files[0]));
                        setIconImage((e.target.files[0]))
                      }
                     
                      }} name='iconImage' id="imgIcon" placeholder="Please Select the Icon Image for the Spot" />
                     {
                      (icon_imageUrl!=null?<img src={icon_imageUrl} className='mt-3' height={100} width={200}/>:<img src={`http://localhost:7000/${icon_image}`} className='mt-3' height={100} width={200}/>)
                     }
                        
                      
                    
                    <label htmlFor="imgIcon">Icon Image</label>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                 
                    <input type="file" className="form-control"  id="imgBanner"  name='bannerImage'  onChange={e => {
                      if(e.target.files[0]!=null){
                      setBannerImage((e.target.files[0]));
                      setBannerImageURL(URL.createObjectURL(e.target.files[0]))}
                      }} placeholder="Please Select the Banner Image for the Spot" />
                      {
                        (banner_imageUrl!=null? <img src={banner_imageUrl} className='mt-3' height={100} width={200}/>:<img src={`http://localhost:7000/${banner_image}`} className='mt-3' height={100} width={200}/>)
                       
                      }
                    
                    <label htmlFor="imgBanner">Banner Image</label>
                  </div>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='txtLongitude' value={longitude} onChange={e => setLongitude(e.target.value)} placeholder='Please enter the longitude'></input>
                    <label htmlFor='txtLongitude'>Longitude</label>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <input type='text' className='form-control' id='txtLattitude' value={lattitude} onChange={e => setlattitude(e.target.value)} placeholder='Please enter the lattitude'></input>
                    <label htmlFor='txtLattitude'>Lattitude</label>
                  </div>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <input type='text' className='form-control' value={short_description} onChange={e => setShortDesc(e.target.value)} id='txtShortDescription' placeholder='Please enter the Short Description'></input>
                    <label htmlFor='txtShortDescription'>Short Description</label>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-floating mb-3'>
                    <textarea type='text' multiple className='form-control' value={full_description} onChange={e => setFullDesc(e.target.value)} id='txtLongDescription' placeholder='Please enter the Long Description of the Spot'></textarea>
                    <label htmlFor='txtLongDescription'>Long Description</label>
                  </div>
                </div>
              </div>
              <div className='row mb-2'>
                <div className='col-md-6'>
                  <div className='form-check mb-3'>
                    <input type='checkbox' className="form-check-input" id='chkShowOnHomePage' onChange={e => setShowOnHomePage(e.target.checked)} checked={showonhomepage} name='chkShowOnHomePage'></input>
                    <label htmlFor='chkShowOnHomePage'>Show On HomePage</label>
                  </div>
                </div>

              </div>
              <div className='row justify-content-center align-items-center mt-4'>
                <center><a role='button' className='btn-Round2' onClick={e=>handleUpdate(id)}>Update Spot</a></center>
              </div>
            </div>

          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  )
}

export default Spot_Update