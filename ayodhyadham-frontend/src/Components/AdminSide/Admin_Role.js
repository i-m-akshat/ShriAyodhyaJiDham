import React from 'react'
import { Routes,Route,Link } from 'react-router-dom'
import Role_List from './Role_List'
import Role_Add from './Role_Add'
import Role_Update from './Role_Update'

function Admin_Role() {
  return (
    <div className='container-fluid my-5'>
      <Routes>
        <Route path='/' Component={Role_List}/>
        <Route path='/AddRole' Component={Role_Add}/>
        <Route path='/UpdateRole' Component={Role_Update}/>
      </Routes>
    </div>
  )
}

export default Admin_Role