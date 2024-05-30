import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import divider from '../assets/img/headDivider.svg';
import Swal from 'sweetalert2';
import Card_Image from './Card_Image';
function SpotDetails() {
    const location=useLocation();
    const [SpotDetails,setSpotDetails]=useState([]);
    const [otherSpots,setOtherSpots]=useState([]);
    const id=location.state.id;

    const fetchSpotDetails=async()=>{
        const response=await fetch(`http://localhost:7000/manageSpot/GetSpotByid/${id}`,{
            method:"GET",
            headers:{
                "content-type":'application/json'
            }
        })
        const data=await response.json();
        console.log(data);
        setSpotDetails(data[0]);
    }
    const fetchNextSpots=async(id)=>{
        const response=await fetch(`http://localhost:7000/manageSpot/nextSpots/${id}`,{
            method:"GET",
            headers:{
                "content-type":'application/json'
            }
        });
        if(response.status===200){
            const data=await response.json();
            console.log(data);
            if(data==='Some Error Occurred'){
                setOtherSpots(data);
            }else{
                setOtherSpots(data);
            }
            
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                showConfirmButton: true,
                timer: 1500
            });
        }
        
       
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
        fetchSpotDetails();
        fetchNextSpots(id);
    },[id])

  return (
    <section className='container-fluid mt-3 ' style={{transition:"0.8s ease-in-out"}}>
      <div className="mt-3 containerSpotDetails">
    <div className="row justify-content-center g-2 " style={{textAlign:"center"}}>
    <div className="p-2 ">
            <div style={{textAlign:"center"}}>
            <h4 className="text-center headerText p-b-50 mt-4">
            {SpotDetails.spot_name}
  </h4>
  <img src={divider} alt="-" style={{height: "20px"}}/>
  </div>
  <div className="p-2 mt-2">
                
            </div>
              
            </div>
        <div className="col-sm-12" >
        <div className='row justify-content-center d-flex align-items-stretch'>
            <div className='col-md-6'>
                <div className='p-2 m-2 '>
                    <h3 className='text-black-50'><label id="lblShortDescription" className="text-align-justify fontstyle">{SpotDetails.short_description}</label></h3>
                </div>
            <div className="p-2">
                <p ><label id="lblFullDescription" className="fs-5 text-danger fontstyle" style={{textAlign: "justify"}} >{SpotDetails.full_description}</label></p>
            </div>
            </div>
            <div className='col-md-6'>
            <div className="p-2 text-center">
                <img id="BannerImage" style={{borderRadius:"20px"}}  className="img-fluid" alt="blog page" src={`http://localhost:7000/${SpotDetails.banner_image}`}  />
            </div>
            </div>
        </div>
            
          
        </div>
        <div className="col-md-12 mt-5 me-0">
            <h3 className='text-black-50 mt-5 me-0'>
                See Also
            </h3>
            <div className='col-md-12'>
            <div className="p-1">
               <div className='row'>
                {
                    otherSpots!=0 &&
                    otherSpots.map((res,index)=>(

                    <Card_Image key={index} img={res.icon_image} id={res.spot_id} desc={res.short_description} title={res.spot_name}/>
                
                    ))
                }
                
               
                </div> 
                {/* <img className="img-fluid rounded" src={`http://localhost:7000/${SpotDetails.icon_image}`}  alt="blog page"/> */}
            </div>
            </div>
           
        </div>
    </div>
</div>
    </section>
  )
}

export default SpotDetails