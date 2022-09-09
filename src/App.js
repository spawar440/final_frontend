
import './App.css';
import Home from './Components/Home/Home';
import RestaurantDetails from './Components/RestaurantDetails/RestaurantDetails';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Filter from './Components/RestaurantDetails/Filter';
const mongoose = require('mongoose')
function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/details/:rName' element={<RestaurantDetails/>} />
      <Route path='/filter' element={<Filter/>}/>
    </Routes>
    </div>

 
  );
}

export default App;
