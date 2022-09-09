import { get } from 'mongoose';
import React, { Component } from 'react'
import homepage from '../../assets/background2.png';
import "../../Styles/Wallpaper.css"
import { Link } from 'react-router-dom';
export default class Wallpaper extends Component {
  constructor(){
    super()
    // console.log("Constructor Method is called")
    this.state={
        locations:[],
        restaurants:[]
    }
  }

 

static getDerivedStateFromProps(props,state){
    // console.log("getDerivedStateFromProps Method is called")
    return{}
}  

shouldComponentUpdate(){
    return true
}


getSnapshotBeforeUpdate(prevProps,prevState){
    // console.log(`getSnapshotBeforeUpdate method called with PrevState ${prevProps} and ${prevState}`)
return{}
}

componentDidUpdate(){
    // console.log("componentDidUpdate method is called ")
}
componentDidMount()
{
    // console.log("componentDidMount Method is called")  
    fetch('http://localhost:8083/location',{method:'GET'})
    .then(response=>response.json())
    // .then(data=>console.log(data))
    .then(data=>this.setState({locations:data.data}))
}


fetchRestaurants = (event)=>{
    console.log(event.target.value)
    fetch(`http://localhost:8083/restaurants/${event.target.value}`,{method:'GET'})
    .then(response=>response.json())
    .then(data=> {this.setState({restaurants:data.data});
    // console.log(data.data    )
})
}


    render() {

     let locationOptions = this.state.locations.length && this.state.locations.map((item)=><option key={item.name} value={item.city_id}>{item.name}</option>)   
   let restaurantsList= this.state.restaurants.length && <ul>
    {
    this.state.restaurants.map((item) => 
        <li key={item.name} ><Link to={`/details/${item.name}`}>
            {item.name}</Link>
            </li>)
         }</ul>
    

     
    //  console.log("Render Method is called")

    return (
        <div>
        <div>
            <img src={homepage} width="100%" height="450" />
        </div>
            <span className="label" data-toggle="modal" data-target="#exampleModal">Login</span>
            <div className="border">
                <span className="account">Create an account</span>
            </div>
            <div className=""></div>
    
            <div className="logo1">
                <p>e!</p>
            </div>
        
            <div className="headings">
                Find the best restaurants, cafes, bars
            </div>

            <div className="location">
             <select className="dropdownLoc" onChange={this.fetchRestaurants}>
                <option value="0">Select</option>
                  {locationOptions}
            </select> 
            <div id="notebooks">
                <input className="restaurant" type="text" placeholder="Please Enter Restaurant Name" />
                {restaurantsList}
                {/* <span className="glyphicon glyphicon-search search"></span> */}
            </div>
        </div>
    </div>
    )
  }
}
