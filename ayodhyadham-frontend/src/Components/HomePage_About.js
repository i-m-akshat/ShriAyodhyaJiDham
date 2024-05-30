import React from 'react'
import RamMandirImg from  '../assets/img/mandirWide.jpg' 
import divider from '../assets/img/headDivider.svg';
function HomePage_About() {
  return (
    <section className=''>
      {/* <!-- About 1 - Bootstrap Brain Component --> */}
<div className="py-3 py-md-5 my-4 py-4 " >
  <div className="container-fluid" >
    <div style={{textAlign:"center"}}>
    <h2 className="text-center headerText p-b-50 mt-4">
      About Us
  </h2>
  <img src={divider} alt="-" style={{height: "20px"}}/>
    </div>
  
    <div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center mt-5 aboutContainer">
      <div className="col-12 col-lg-6 col-xl-5">
        <img className="img-fluid" loading="lazy" style={{borderRadius:"20px"}} src={RamMandirImg} alt="About 1"/>
      </div>
      <div className="col-12 col-lg-6 col-xl-7">
        <div className="row justify-content-xl-center">
          <div className="col-12 col-xl-11">
            <h2 className="mb-3"></h2>
            <p className="lead fs-4 text-black-50 mb-3" style={{fontWeight:"550"}}>Welcome to AyodhyaDham, your gateway to the sacred city of Ayodhya. Known as the birthplace of Lord Rama, Ayodhya is a treasure trove of spiritual and cultural heritage.</p>
            <p className="mb-5">Our mission is to provide a comprehensive and engaging platform for exploring Ayodhya’s rich history, spirituality, and culture. We aim to connect devotees, travelers, and history enthusiasts with the essence of this ancient city.</p>
            <div className="row gy-4 gy-md-0 gx-xxl-5X">
              <div className="col-12 col-md-6">
                <div className="d-flex">
                  <div className="me-4">
                  <i className="fa-solid fa-gear" style={{color:"#F25C05"}}></i>
                  </div>
                  <div>
                    <h2 className="h4 mb-3">Historical Insights</h2>
                    <p className="text-secondary mb-0">Detailed articles on Ayodhya's historical landmarks and evolution.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex">
                  <div className="me-4">
                  <i className="fa-solid fa-fire-flame-curved" style={{color:"#F25C05"}}></i>
                  </div>
                  <div>
                    <h2 className="h4 mb-3">Travel Information</h2>
                    <p className="text-secondary mb-0">Practical guides on visiting Ayodhya, including transportation and accommodations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </section>
  )
}

export default HomePage_About