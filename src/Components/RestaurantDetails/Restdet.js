
import React from 'react' 
import Header from '../Common/Header' 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; 
import 'react-tabs/style/react-tabs.css'; 
import { useParams} from 'react-router-dom'; 
import { useEffect,useState } from 'react'; 
import '../../Styles/RestaurantDetails.css' 
import Modal from 'react-modal' 
Modal.setAppElement('#root') 
export default function Restdet() 
{ 
let { rName } =useParams() 
const[restaurant,setRestaurant]=useState({}) 
const [isMenuModalOpen, setIsMenuModalOpen] = useState(false) 
const [menu, setMenu] = useState([]) 
const [totalPrice, setTotalPrice] = useState(0) 
useEffect(() => { 
fetch(`http://localhost:8083/restaurant/details/${rName}`,{method:'GET'}) 
.then(response=>response.json()) 
.then(data=>setRestaurant(data.data)) 
}, []) //behave like componentdidMount if second parameter is a blank array 
const fetchMenu=()=>{ 
fetch(`http://localhost:8083/menu/${rName}`,{method:'GET'}) 
.then(response=>response.json()) 
.then(data=>setMenu(data.data)) 
} 
const calTotalPrice=(item)=>{ 
let price=totalPrice+ item.itemPrice; 
setTotalPrice(price) 
} 
const{name,thumb,cost,address,Cuisine}=restaurant 
let cuisineList=!(Cuisine==undefined) && Cuisine.length && Cuisine.map((item)=>item.name)
return ( 
<div> 
<Header></Header> 
<div> 
<img src={thumb} height="400px" width="100%"/> 
</div> 
<div> 
<h2>{name}</h2> 
<button 
className='btn btn-danger' 
style={{float:'right'}} 
onClick={()=>{ 
setIsMenuModalOpen(true); 
fetchMenu(); 
}}> 
Place Online Order 
</button> 
</div> 
<div> 
<Tabs> 
<TabList> 
<Tab>Overview</Tab> 
<Tab>contact</Tab> 
</TabList> 
<TabPanel> 
<div className='about'>About the place</div> 
<div className='head'>Cuisine</div> 
{cuisineList} 
<div className='head'>Average Cost</div>  
<div className='value'>&#8377; {cost}</div> 
</TabPanel> 
<TabPanel> 
<div className='head'>Phone Number</div> 
<div className='value'>+91-123456789</div> 
<div className='head'>{name}</div> 
<div className='value'>{address}</div> 
</TabPanel> 
</Tabs> 
</div> 
<div> 
<Modal 
isOpen={isMenuModalOpen} 
> 
<div> 
<div className='row'> 
<div className='col-sm-9'> 
<h2>Menu</h2> 
</div> 
<div className='col-sm-3'> 
<button className='btn btn-danger float-end' onClick={()=>setIsMenuModalOpen(false)}>X</button> 
</div> 
</div> 
<ul> 
{ 
menu.length && 
menu.map((item, index)=><li key={index}> 
<div> 
{ 
item.isVeg ? <span className='text-success'>Veg</span>:<span className='text-danger'>Non-veg</span> 
} 
</div> 
<div className='cuisines'>{item.itemName}</div> 
<div className='cuisines'>&#8377; {item.itemPrice}</div> 
<div className='cuisines'>{item.itemDescription}</div> 
<div> 
<button className='btn btn-secondary' onClick={()=>calTotalPrice(item)}>Add</button> 
</div> 
</li>) 
} 
</ul> 
<hr/> 
<h3>Total Price:{totalPrice}</h3> 
</div> 
</Modal> 
</div> 
</div> 
) }