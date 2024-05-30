import React from 'react'
import divider from '../assets/img/headDivider.svg';
import planeicon from '../assets/img/PlaneIcon.png'
import busIcon from '../assets/img/busiconSaff.png';
import trainIcon from '../assets/img/train.png';
function HomePage_HowToReach() {
    
  return (
    <section>
        <div className='containerReach'>

<div className='py-2'>
             <div style={{textAlign:"center"}}>
            <h2 className="text-center headerText p-b-50 mt-4">
      How To Reach
  </h2>
  <img src={divider} alt="-" style={{height: "20px"}}/>
  </div>
</div>
<div className='col-12 mt-2'>
<div className='row mx-4 '>
    <div className='col-md-4 align-items-stretch d-flex'>
                <div className="card text-white shadow-lg p-3 mb-5 rounded " style={{backgroundColor:"#F25C05"}} >
                  
                    <img src={planeicon} style={{width:"50%",marginRight:"auto",marginLeft:"auto",display:"block"}} height={80} width={80} className="img-fluid d-flex" alt="..."/>
                    
                    <div className="card-body d-flex flex-column py-2">
                        <h3 className="card-title my-2 text-center" style={{fontStyle:"bold"}}>By Air</h3>
                        <p className="card-text my-2 py-2">Several airlines are operating from Major cities to Mahirishi Valmiki International Airport Ayodhya which is approximately 10km from Ayodhya Dham . People can also reach from Lucknow ,Gorakhpur, Prayagraj and Varanasi Airports.</p>
                        <center><a className="btnRound_white">View More</a></center>
                    </div>
                </div>
            </div>
            <div className='col-md-4 align-items-stretch d-flex ' >
                <div className="card shadow-lg p-3 mb-5 rounded " style={{backgroundColor:'white'}} >
                  
                    <img src={busIcon} style={{width:"50%",marginRight:"auto",marginLeft:"auto",display:"block"}} height={80} width={80} className="img-fluid d-flex" alt="..."/>
                    
                    <div className="card-body d-flex flex-column py-2" style={{color:"#F25C05"}}>
                        <h3 className="card-title my-2 text-center" style={{fontStyle:"bold"}}>By Bus</h3>
                        <p className="card-text my-2 py-2">The major cities of north India are well-connected to Ayodhya.The city is about 130 k.m. from Lucknow, 200 k.m. from Varanasi, 160 k.m. from Prayagraj , 140 k.m. from Gorakhpur and about 636 k.m. from Delhi. </p>
                        <center><a className="btnRound">View More</a></center>
                    </div>
                </div>
            </div>
            <div className='col-md-4 align-items-stretch d-flex ' >
                <div className="card text-white shadow-lg p-3 mb-5 rounded " style={{backgroundColor:"#F25C05"}} >
                  
                    <img src={trainIcon} style={{width:"50%",marginRight:"auto",marginLeft:"auto",display:"block"}} height={80} width={80} className="img-fluid d-flex" alt="..."/>
                    
                    <div className="card-body d-flex flex-column py-2">
                        <h3 className="card-title my-2 text-center" style={{fontStyle:"bold"}}>By Train</h3>
                        <p className="card-text my-2 py-2">Ayodhya Cantt and Ayodhya are major railway stations of the district and are well connected to almost all major cities and towns. By Rail route Ayodhya is 128 kms. from Lucknow, 171 kms. from Gorakhpur, 157 kms. from Prayagraj and 196 kms from Varanasi.</p>
                        <center><a className="btnRound_white">View More</a></center>
                    </div>
                </div>
            </div>
    </div>
</div>
</div>

    
    </section>
  )
}

export default HomePage_HowToReach