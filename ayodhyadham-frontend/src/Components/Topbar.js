import React from 'react'
import './Topbar.css'

function Topbar() {
  return (
    <div>
        <div className="row d-md-flex d-none topbar">
                <div className="row">
                    <div className="col-md-6 col-lg-6 topbar-links">
                            <a href="mailto:akshatdwivedi59941@gmail.com" >
                                <i className="fa-solid fa-envelope icons"></i>
                                <span >akshatdwivedi59941@gmail.com</span>
                        </a>
                       
                            <a href="tel:+919519595778" >
                                <i className="fa fa-phone icons"></i>
                                <span > +91-9519595778</span>
                        </a>
                    
                        </div>
                    <div className="col-md-6 col-lg-6 topbar-icons">
                        
                        <a target="_blank" href="#"><i className="fa-brands fa-facebook "></i></a>
                        <a target="_blank" href="#"><i className="fa-brands fa-instagram "></i></a>
                        <a target="_blank" href="#"><i className="fa-brands fa-twitter"></i></a>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Topbar