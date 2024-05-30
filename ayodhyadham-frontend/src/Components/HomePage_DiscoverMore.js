import React from 'react'
import divider from '../assets/img/headDivider.svg';
import RajaRam from '../assets/img/shree-ram-55.png';
import AyodhyaVid from '../assets/img/AYODHYA_ENGLISH.mp4';
function HomePage_DiscoverMore() {
  return (
    <section className='container-fluid mt-4'>
       <div className='mb-4' style={{textAlign:"center"}}>
    <h2 className="text-center headerText p-b-50 mt-4">
      Discover Ayodhya
  </h2>
  <img src={divider} alt="-" style={{height: "20px"}}/>
    </div>
    <div className='diagonal-box'>
      <div className='content'>
        <div className='row align-items-center'>
          <div className='col-md-6'>
          <span><p className='text-white text-subhead'>Discover more<br/>about the wonders of <br/><h1 className='text-white text-head'>Ayodhya</h1></p>
              </span>
              <div className='card' style={{borderRadius:"20px",alignItems:"flex-start"}}>
               <video src={AyodhyaVid} className='img-fluid' id='discover_Video' controls></video>
              </div>
              <div className='btnDisc'>
              <a className='btnRound_white' style={{borderRadius:"20px"}}>Explore Ayodhya</a>
              </div>
             
          </div>
          <div className='col-md-6 '>
            <img src={RajaRam} className='discoverImage img-fluid d-flex'/>
          </div>
        </div>
      </div>
    </div>
    </section>
    
  )
}

export default HomePage_DiscoverMore