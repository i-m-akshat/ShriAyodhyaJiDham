import React from 'react'
import { Routes,Route,Link } from 'react-router-dom'
import Category_List from './Category_List'
import Category_Add from './Category_Add'
import Category_Update from './Category_Update'

function Admin_Category() {
  return (
    <div className='container-fluid my-5'>
      <Routes>
        <Route path='/' Component={Category_List}/>
        <Route path='/AddCategory' Component={Category_Add}/>
        <Route path='/UpdateCategory' Component={Category_Update}/>
      </Routes>
    </div>
  )
}

export default Admin_Category