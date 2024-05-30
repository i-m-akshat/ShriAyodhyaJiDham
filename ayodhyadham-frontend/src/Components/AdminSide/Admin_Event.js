import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Event_List from './Event_List'
import Event_Add from './Event_Add'
import Event_Update from './Event_Update'
function Admin_Event() {
    return (
        <div className='container-fluid my-5'>
            <Routes>
                <Route exact path='/' Component={Event_List} />
                <Route path='/AddEvent' Component={Event_Add} />
                <Route path='/UpdateEvent' Component={Event_Update} />
            </Routes>
        </div>
    )
}

export default Admin_Event