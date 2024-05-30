import React, { useEffect, useState } from 'react'
import divider from '../assets/img/headDivider.svg';
import EventCardSlider from "./EventCardSlider";

function HomePage_UpcomingEvents() {
  const [events,setEvents]=useState([]);
    const fetchevents=async()=>{
        const response=await fetch('http://localhost:7000/manageEvent/GetUpcomingEvents',{
            method:"GET",
            headers:{
                "content-type":'application/json'
            }
        });
        const data=await response.json();
          console.log(data);
          if(data==='Some Error Occurred'){
            setEvents(0)
          }else{
            setEvents(data);
          }
         
        
       
    }
    useEffect(()=>{
        fetchevents();
    },[])
  return (
    <section className='my-4 py-4'>
    <div className='containerPlaces'>
     <div style={{textAlign:"center"}}>
    <h2 className="text-center headerText p-b-50 mt-4">
Upcoming Events In Ayodhya
</h2>
<img src={divider} alt="-" style={{height: "20px"}}/>
</div>
{
  (events!=0)&& <EventCardSlider Events={events} id='eventsCarousel'/>
}
 
  </div>
</section>
  )
}

export default HomePage_UpcomingEvents
