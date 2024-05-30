import React from 'react'
import { Route,Routes } from 'react-router-dom'
import MainLanding_Admin from './MainLanding_Admin'
import Admin_Category from './Admin_Category'
import Admin_Spot from './Admin_Spot'
import Admin_Event from './Admin_Event'
import Admin_Role from './Admin_Role'
import Admin_admin from './Admin_admin'

function MainForm() {
  return (
    <>
    <Routes>
        <Route path='/' Component={MainLanding_Admin}/>
        <Route path='/Category/*' Component={Admin_Category}/>
        <Route path='/Spot/*' Component={Admin_Spot}/>
        <Route path='/Event/*' Component={Admin_Event}/>
       <Route path='/Role/*' Component={Admin_Role}/>
       <Route path='/Admin/*' Component={Admin_admin}/>
    </Routes>
    </>
  )
}

export default MainForm