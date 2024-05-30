import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "bootstrap/dist/js/bootstrap.min.js";

import 'font-awesome/css/font-awesome.min.css';
import './assets/FontAwesome/css/all.min.css';
import { Routes,Route } from 'react-router-dom';
import UserSide from './Components/UserSide';
import AdminSide from './Components/AdminSide/AdminSide';


function App() {

  return (
    <div className="">
      <Routes>
        <Route exact path='/*'  Component={UserSide}/>
        <Route exact path='/Admin/*' Component={AdminSide}/>
      </Routes>
    </div>
  );
}

export default App;
