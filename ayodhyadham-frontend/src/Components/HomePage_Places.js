import React, { useEffect, useState } from 'react'
import divider from '../assets/img/headDivider.svg';
import CardSlider from "./CardSlider";
function HomePage_Places() {
    const [spots,setSpots]=useState([]);
    const fetchSpots=async()=>{
        const response=await fetch(process.env.REACT_APP_URL+'/manageSpot/',{
            method:"GET",
            headers:{
                "content-type":'application/json'
            }
        });
        const data=await response.json();
        console.log(data);
        setSpots(data);
    }
    useEffect(()=>{
        fetchSpots();
    },[])
    return (
        <section className='my-4 py-4'>
            <div className='containerPlaces'>
             <div style={{textAlign:"center"}}>
            <h2 className="text-center headerText p-b-50 mt-4">
      Temples In Ayodhya
  </h2>
  <img src={divider} alt="-" style={{height: "20px"}}/>
  </div>
          <CardSlider Spots={spots} id='SpotsCarousel'/>
          </div>
        </section>
    )
}

export default HomePage_Places