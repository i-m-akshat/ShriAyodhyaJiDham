import React from 'react'
import { Routes,Route,Link } from 'react-router-dom'
import Admin_List from './Admin_List'
import Admin_Add from './Admin_Add'
import Admin_Update from './Admin_Update'

function Admin_admin() {
  return (
    <div className='container-fluid my-5'>
      <Routes>
        <Route path='/' Component={Admin_List}/>
        <Route path='/AddAdmin' Component={Admin_Add}/>
        <Route path='/UpdateAdmin' Component={Admin_Update}/>
      </Routes>
    </div>
  )
}

export default Admin_admin