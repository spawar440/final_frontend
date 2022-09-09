import React, { Component } from 'react'

export default class Mealtype extends Component {
   
    render() {
        const{name,content,image}=this.props.item
    return (
      
       
        <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="tileContainer">
            <div className="tileComponent1">
               
                <img src={require('../../' + image)} height="150" width="140" />
            </div> 
            <div className="tileComponent2">
                <div className="componentHeading">
                  {name}
                </div>
                <div className="componentSubHeading">
                   {content}
                </div>
            </div>
        </div>
    </div> 
       
      )
    
  }

}