import React, { useEffect ,useState} from 'react'
import LandingPageContent from './LandingPageContent'
import UpComingEvents from './UpComingEvents'
import HomePage_Places from './HomePage_Places'
import HomePage_About from './HomePage_About'
import { Hourglass} from 'react-loader-spinner';
import HomePage_HowToReach from './HomePage_HowToReach'
import HomePage_DiscoverMore from './HomePage_DiscoverMore'
import HomePage_UpcomingEvents from './HomePage_UpcomingEvents'

function Homepage() {
  const [loading, setLoading] = useState(true);
useEffect(()=>{
   // Simulate a loading time (e.g., fetching data)
   const timer = setTimeout(() => {
    setLoading(false);
  }, 1500); // Change this duration as needed

  return () => clearTimeout(timer);
},[])
  return (
    <div>
      {loading?(
        <div className='loader-container'>
           {/* <Bars className='text-center'
  height="80"
  width="80"
  radius="9"
  color="#F25C05"
  ariaLabel="three-dots-loading"
  wrapperStyle
  wrapperClass
/> */}
<Hourglass
  visible={true}
  height="80"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#F25C05', 'orange']}
  />
          </div>
       
      ):
        (<div className="_mainContent mt-2">
            <LandingPageContent/>
            <HomePage_About/>
           <HomePage_Places/>
           <HomePage_DiscoverMore/>
           <HomePage_UpcomingEvents/>
           <HomePage_HowToReach/>
           
        </div>)}
        
    </div>
  )
}

export default Homepage