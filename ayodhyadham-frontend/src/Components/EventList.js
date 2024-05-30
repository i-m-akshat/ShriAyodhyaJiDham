import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import divider from '../assets/img/headDivider.svg';
import EventCard from './EventCard';
function EventList() {
  const [allEvents,setAllEvents]=useState([]);
  const fetchAllEvents=async()=>{
    const response=await fetch('http://localhost:7000/manageEvent/GetUpcomingEvents',{
      method:"GET",
      headers:{
        'content-type':'application/json'
      }
    });
    if(response.status===200){
      const data=await response.json();
      setAllEvents(data);
    }
  }
  useEffect(()=>{
    window.scroll(0,0);
    fetchAllEvents();
  },[])
  return (
    <section className='container-fluid my-3' style={{transition:"1s ease-in-out"}}>
    <div className="my-4 ">
  <div className="row justify-content-center g-2 containerSpotList" style={{textAlign:"center"}}>
  <div className="p-2 ">
          <div style={{textAlign:"center"}}>
          <h4 className="text-center headerText p-b-50 mt-4">
          All Events
</h4>
<img src={divider} alt="-" style={{height: "20px"}}/>
</div>
<div className='row g-2 mt-4'>
{
  allEvents.map((res,index)=>(
    <EventCard key={index} img={res.icon_image} id={res.event_id} desc={res.short_description} title={res.event_name} />
  ))
}
</div>

</div>
</div>

</div>
</section>
  )
}

export default EventList