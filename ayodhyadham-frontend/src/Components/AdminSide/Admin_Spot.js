import React from 'react'
import { Routes,Route,Link } from 'react-router-dom'


import Spot_List from './Spot_List'
import Spot_Add from './Spot_Add'
import Spot_Update from './Spot_Update'

function Admin_Spot() {
  return (
    <div className='container-fluid my-5'>
   
      <Routes>
        <Route path='/' Component={Spot_List}/>
        <Route path='/AddSpot' Component={Spot_Add}/>
        <Route path='/UpdateSpot' Component={Spot_Update}/>
      </Routes>
    </div>
  )
}

export default Admin_Spot