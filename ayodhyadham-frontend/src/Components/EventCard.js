import React from 'react'
import { useNavigate } from 'react-router-dom'

function EventCard({img,title,desc,id}) {
    const navigate=useNavigate();
    const handleClick=async(id)=>{
        navigate('../EventDetails',{state:{id:id}});
    }
    return (
        <>
            <div className='col-md-3 align-items-stretch d-flex'>
                <div className="card shadow mb-5 bg-body rounded" >
                  
                    <div className="card-body d-flex flex-column">
                    <img src={`${process.env.REACT_APP_URL}/${img}`}   className="img-fluid" alt="..."/>
                        <h5 className="card-title text-center mt-4 mb-0" style={{fontStyle:"bold"}}>{title}</h5>
                        <div class="col-12 mb-0 mt-auto">
                        <p className="card-text">{desc}</p>
                        <center><a className="btnRound" onClick={e=>handleClick(id)}>View More</a></center>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default EventCard