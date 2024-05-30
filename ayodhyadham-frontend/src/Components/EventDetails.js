import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import divider from '../assets/img/headDivider.svg';
import Swal from 'sweetalert2';
import Card_image_event from './Card_image_event';
function EventDetails() {
    const location=useLocation();
    const [EventDetails,setEventDetails]=useState([]);
    const [otherEvents,setOtherEvents]=useState([]);
    const id=location.state.id;
    
    const fetchEventDetails=async()=>{
        const response=await fetch(`${process.env.REACT_APP_URL}/manageEvent/GetEventById/${id}`,{
            method:"GET",
            headers:{
                "content-type":'application/json'
            }
        })
        const data=await response.json();
        console.log(data);
        const date = new Date(data[0].event_date);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      // var eventDate=new Date(parseInt(data[0].event_date, 10));
      // var eventDate=data[0].event_date.split('T')[0];
      data[0].event_date=`${year}-${month}-${day}`;
        setEventDetails(data[0]);
    }
    const fetchNextEvents=async(id)=>{
        const response=await fetch(`${process.env.REACT_APP_URL}/manageEvent/nextEvents/${id}`,{
            method:"GET",
            headers:{
                "content-type":'application/json'
            }
        });
        if(response.status===200){
            const data=await response.json();
            console.log(data);
            if(data==='Some Error Occurred'){
                setOtherEvents(0)
            }else{
                setOtherEvents(data);
            }
            
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                showConfirmButton: true,
                timer: 1500
            });
            setOtherEvents(0);
        }
        
       
    }
    useEffect(()=>{
        window.scrollTo(0, 0);
        fetchEventDetails();
        fetchNextEvents(id);
    },[id])

  return (
    <section className='container-fluid mt-3 ' style={{transition:"0.8s ease-in-out"}}>
      <div className="mt-3 containerSpotDetails">
    <div className="row justify-content-center g-2 " style={{textAlign:"center"}}>
    <div className="p-2 ">
            <div style={{textAlign:"center"}}>
            <h4 className="text-center headerText p-b-50 mt-4">
            {EventDetails.event_name}
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
                    <h3 className='text-black-50'><label id="lblShortDescription" className="text-align-justify fontstyle">{EventDetails.short_description}</label></h3>
                </div>
            <div className="p-2">
                <p ><label id="lblFullDescription" className="fs-5 text-danger fontstyle" style={{textAlign: "justify"}} >{EventDetails.full_description}</label></p>
            </div>
            </div>
            <div className='col-md-6'>
            <div className="p-2 text-center">
                <img id="BannerImage" style={{borderRadius:"20px"}}  className="img-fluid" alt="blog page" src={`${process.env.REACT_APP_URL}/${EventDetails.banner_image}`}  />
            </div>
            </div>
        </div>
            <div className='col-md-12'>
            {/* <div className='row justify-content-center d-flex align-items-stretch'> */}
                <div className='p-2'>
                <h5 className='float-start'>Venue:&nbsp;<span style={{color:"#F25C05"}}>{EventDetails.spot_name}</span> </h5>
                </div><br/>
                <div className='p-2'>
                <h5 className='float-start'>Date:&nbsp;<span style={{color:"#F25C05"}}>{EventDetails.event_date}</span></h5>
                </div>
            {/* </div> */}
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
                    (otherEvents!==0)&&(
                    otherEvents.map((res,index)=>(
                        
                    <Card_image_event key={index} img={res.icon_image} id={res.event_id} desc={res.short_description} title={res.event_name}/>
                
                    )))
                }
                
               
                </div> 
                {/* <img className="img-fluid rounded" src={`${process.env.REACT_APP_URL}/${EventDetails.icon_image}`}  alt="blog page"/> */}
            </div>
            </div>
           
        </div>
    </div>
</div>
    </section>
  )
}

export default EventDetails