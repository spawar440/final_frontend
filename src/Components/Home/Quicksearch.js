import React, { Component } from 'react'
import Mealtype from './Mealtype'

export default class Quicksearch extends Component {
  
    constructor(){
        super()
        this.state={
            mealtypes:[]
        }
    }

    componentDidMount(){
        fetch('http://localhost:8083/mealtype',{method:'GET'})
        .then(response=>response.json())
        // .then(data=>console.log(data))
        .then(data=>this.setState({mealtypes:data.data}))
    }
  
    render() {
        let quickSearchList = this.state.mealtypes.length && this.state.mealtypes.map((item)=><Mealtype item={item} key={item.name}></Mealtype>)
    return (
        <div>
        <div className="searchQck">
        <span className="headingQck">
            Quick Searches
        </span>
        <p className="subheadingQck">
            Discover restaurants by type of meal
        </p>
        {/* <!-- Creating CSS Grid - Rows & Columns -->
        <!-- Creating CSS Responsive Conatiner --> */}
        <div className="container-fluid">
            {/* <!-- Adding Row --> */}
            <div className="row">

                {quickSearchList}
                {/* <!-- Adding Items i n Column --> */}
                 {/* <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="tileContainer">
                        <div className="tileComponent1">
                            <img src="../Assets/breakfast.png" height="150" width="140" />
                        </div>
                        <div className="tileComponent2">
                            <div className="componentHeading">
                                Breakfast
                            </div>
                            <div className="componentSubHeading">
                                Start your day with exclusive breakfast.
                            </div>
                        </div>
                    </div>
                </div>  */}
                {/* <!-- Adding Items in Column --> */}
                {/* <div className="col-sm-12 col-md-12 col-lg-4">
                    <div className="tileContainer">
                        <div className="tileComponent1">
                            <img src="./Images/lunch.png" height="150" width="140" />
                        </div>
                        <div className="tileComponent2">
                            <div className="componentHeading">
                                Lunch
                            </div>
                            <div className="componentSubHeading">
                                Start your day with exclusive lunch.
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <!-- Adding Items in Column --> */}
                {/* <div className="col-sm-12 col-md-12 col-lg-4">
                    <div className="tileContainer">
                        <div className="tileComponent1">
                            <img src="./Images/snacks.png" height="150" width="140" />
                        </div>
                        <div className="tileComponent2">
                            <div className="componentHeading">
                                Snacks
                            </div>
                            <div className="componentSubHeading">
                                Start your day with exclusive snacks.
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div> 
            {/* <!-- Adding Row --> */}
            {/* <div className="row"> */}
                {/* <!-- Adding Items in Column --> */}
                {/* <div className="col-sm-12 col-md-12 col-lg-4">
                    <div className="tileContainer">
                        <div className="tileComponent1">
                            <img src="./Images/dinner.png" height="150" width="140" />
                        </div>
                        <div className="tileComponent2">
                            <div className="componentHeading">
                                Dinner
                            </div>
                            <div className="componentSubHeading">
                                Start your day with exclusive dinner.
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <!-- Adding Items in Column --> */}
                {/* <div className="col-sm-12 col-md-12 col-lg-4">
                    <div className="tileContainer">
                        <div className="tileComponent1">
                            <img src="./Images/drinks.png" height="150" width="140" />
                        </div>
                        <div className="tileComponent2">
                            <div className="componentHeading">
                                Drinks
                            </div>
                            <div className="componentSubHeading">
                                Start your day with exclusive drinks.
                            </div>
                        </div>
                    </div>
                 </div> */}
                {/* <!-- Adding Items in Column --> */} 
                {/* <div className="col-sm-12 col-md-12 col-lg-4">
                    <div className="tileContainer">
                        <div className="tileComponent1">
                            <img src="./Images/nightlife.png" height="150" width="140" />
                        </div>
                        <div className="tileComponent2">
                            <div className="componentHeading">
                                NightLife
                            </div>
                            <div className="componentSubHeading">
                                Start your day with exclusive nightlife.
                            </div>
                        </div>
                    </div>
                </div> */}
            {/* </div> */}
        </div>
    </div>
    </div>
    
      )
    
  }
}


