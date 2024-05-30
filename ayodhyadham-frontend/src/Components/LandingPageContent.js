import ShreeRamMainImage from '../assets/img/newRamWithDhanush.png';
// import guptar from '../assets/img/s2.jpg';

import React from 'react'

function LandingPageContent() {
  return (
    <>
        {/* intro */}
<div className="row">
    <section className="container MainContainer" style={{borderRadius: "20px"}}>
      <div className="row justify-content-center align-items-center containerLanding">
        <div className="col-md-6 Container_Image" >
          <img src={ShreeRamMainImage} className="img-fluid d-flex" id="IntroImage"/>
        
        </div>
        
        <div className="col-md-6 container_text" id="">
<h2 className="text-center welcomeText p-b-50">Welcome To Ayodhya Dham</h2>
<h5 className="text-center text-SubHeading mt-5">Discover the Rich Heritage Of Ayodhya</h5>
<p className="text-desc" >"Ayodhya is an ancient city located in the Indian state of Uttar Pradesh. It holds immense religious and cultural significance in Hinduism as it is believed to be the birthplace of Lord Rama, a major deity in Hinduism and the central figure of the epic Ramayana." </p>
        </div>
       
      
      </div>
      </section>
    </div>
  
    </>
  )
}

export default LandingPageContent
