import React from 'react'

function Footer() {
  return (
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F25C05" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                  <div className="container-fluid">
                    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                      <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                          
                        </a>
                        <span className="mb-3 mb-md-0 text-muted">© 2024. Designed And Developed by <a style={{textDecoration:"none",color:"#F25C05"}} href='https://i-m-akshat.github.io/AkshatDwivedi_Portfolio/'>Akshat Dwivedi</a></span>
                      </div>
                  
                      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><a className="text-muted" href="#"><i className="fa-brands fa-facebook "></i></a></li>
                        <li className="ms-3"><a className="text-muted" href="#"><i className="fa-brands fa-instagram "></i></a></li>
                        <li className="ms-3"><a className="text-muted" href="#"><i className="fa-brands fa-twitter"></i></a></li>
                      </ul>
                    </footer>
                  </div>
    </div>
  )
}

export default Footer
