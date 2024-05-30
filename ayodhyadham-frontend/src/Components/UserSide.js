import React from 'react'
import Homepage from './Homepage';
import Navbar from './Navbar';
import Topbar from './Topbar';
import Footer from './Footer';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';
import SpotDetails from './SpotDetails';
import SpotList from './SpotList';
import EventList from './EventList';
import EventDetails from './EventDetails';

function UserSide() {
    return (
        <div>
            <Topbar />
            <Navbar />
            <Routes>
                <Route exact path='/' Component={Homepage} />
                <Route path='/SpotDetails' Component={SpotDetails}/>
                <Route path='/Login' Component={Login} />
                <Route path='/SpotList' Component={SpotList}/>
                <Route path='/AllEvents' Component={EventList}/>
                <Route path='/EventDetails' Component={EventDetails}/>
            </Routes>
            <Footer />
        </div>
    )
}

export default UserSide