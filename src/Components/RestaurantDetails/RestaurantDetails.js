import React from 'react'
import Header from '../Common/Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {useParams} from 'react-router-dom';
import { useEffect,useState } from 'react';
import '../../Styles/RestaurantDetails.css'
import Modal from 'react-modal';
Modal.setAppElement('#root')
//import router from '../../../../backend/routes/restaurant';
export default function RestaurantDetails () {

 let {rName} = useParams()
 const[restaurant,setRestaurant]=useState({})
 const[isModalOpen,setIsModalOpen]=useState(false)
 const[menu,setMenu]=useState([])
 const [totalPrice, setTotalPrice] = useState(0)

 useEffect(() => {
  fetch(`http://localhost:8083/restaurants/details/${rName}`,{method:'GET'})
  .then(response=>response.json())
  .then(data=> setRestaurant(data.data));
  })


const fetchMenu = ()=>{
  fetch(`http://localhost:8083/menu/details/${rName}`,{method:'GET'}) 
  .then(response=>response.json()) 
  .then(data=>{setMenu(data.data);console.log("menu:",menu)}) 
 }

 const calTotalPrice=(item)=>{
  let price = totalPrice+ item.itemPrice;
  setTotalPrice(price)
 }



const loadScript = (src)=>{
  return new Promise((resolve)=>{
    const script=document.createElement("script")
    script.src=src;
    script.onload=()=>{
      resolve(true)
    }
    script.onerror=()=>{
      resolve(false)
    }
    document.body.appendChild(script)
  })
}


  const openRazorpay =async()=>{
  //create order in razorpay by calling backend API.
  try
{
  let orderData;
  orderData=await fetch('http://localhost:8083/pay',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({amount:totalPrice})
}).then(resp=>resp.json())


//open Razorpay window

     const options={
        key:"rzp_test_PgAPimo9Izyqq2",
        name:"SAGGY Food Delivary",
        amount:orderData.amount,
        currency:orderData.currency,
        order_id:orderData.id,
        prefill:{
          email:'abcdefgh123@ssp.com',
          contact:'111-222-3333'
        },
        handler:function(response){
          //call API that would save transaction in db
         

          fetch('http://localhost:8083/pay/save',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              razorpay_amount:orderData.amount
            })
            
            
          }).then(resp=>console.log(resp))
          console.log(response)
        }
     }  

     const paymentWindow= new window.Razorpay(options);
     paymentWindow.open()
}
catch(error){
  console.log(error)
}
}


const{name,thumb,cost,address,Cuisine}=restaurant
// const CuisineList= !(Cuisine==undefined) && Cuisine.length && Cuisine.map((item)=>{item.name})
const cuisineListValue= !(Cuisine===undefined ) && Cuisine.length && 
Cuisine.map((item)=>
  <ul className="value"><li>{item.name}</li></ul>)
// console.log(thumb)
  return (
    <div>
        <Header></Header>
        <div>
          <div>
             <img src={thumb} height="400px" width="100%"></img> 
          </div>
          <div>
            <h2>{name}</h2>
            {/* <button className='btn btn-danger' style={{float:'right'}} 
            onClick={()=>{
                setIsModalOpen(true);
                fetchMenu();                
            }}
          >Place Online Order</button> */}

          <button 
          className='btn btn-danger' 
          style={{float:'right'}} 
          onClick={()=>{ 
            setIsModalOpen(true); 
          fetchMenu(); 
          }}> 
          Place Online Order 
          </button> 

          </div>
          <div>
          <Tabs>
            <TabList>
              <Tab>About</Tab>
              <Tab>Contact</Tab>
            </TabList>

            <TabPanel>
            <div className='about'>About the place </div>
              <ul>
                
                  <li className='head'>Cuisine</li>
                  {cuisineListValue}
                  <li className="head">Average Cost</li>
                  <ul>
                  <li className="value">&#8377; {cost}</li>
                  </ul>
              </ul>
            </TabPanel>
            <TabPanel>
                <ul>
                   <li className="head">Phone Number</li>
                    <div className="value">+91-1234554321</div>
                    <li className="head">Restaurant Name</li>
                    <div className='value'>{name}</div>
                    <li className="head">Address</li>
                    <div className="value">{address}</div>
                </ul>
            </TabPanel>
          </Tabs>
          </div>
          <div>
            <Modal isOpen={isModalOpen}>
              <div className='row'>
                   <div className='col-sm-9'>
                        <h2>Menu</h2>
                   </div>
                   <div className='col-sm-3'>
                   <button className='btn btn-danger float-end' onClick={()=>setIsModalOpen(false)}>X</button>
                   </div>
              </div>

              <ul>
                {
                  menu.length &&
                  menu.map((item,index)=>
                  <li key={index}>
                   
                    <div>
                      {
                      item.isVeg ? <span className='text-success'>Veg</span>:<span className='text-danger'>Non-Veg</span>
                      }
                      <div className='cuisine'> {item.itemName}</div>
                      <div className='cuisine'> &#8377; {item.itemPrice}</div>
                      <div className='cuisine'> {item.itemDescription}</div>
                      <div>
                        <button className='btn btn-success' onClick={()=>calTotalPrice(item)}>Add</button>
                      </div>
                   
                      <div>
                     
                      </div>
                    </div>
                  </li>)
               
                }
                
              </ul>
              <hr />
                      <div>
                      Total Price: {totalPrice} <br/>
                        <button onClick={()=>{setIsModalOpen(false);loadScript('https://checkout.razorpay.com/v1/checkout.js');openRazorpay()}}>Pay Now</button>
                      </div>
                       
                  
            {/* <ul> 
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
<div>  */}
{/* <button className='btn btn-secondary' onClick={()=>calTotalPrice(item)}>Add</button>  */}
{/* </div> 
</li>) 
} 
</ul> */}
            
         
            </Modal>
          </div>
    </div>
    </div>
  )
}
