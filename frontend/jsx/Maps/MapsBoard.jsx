import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";


import MapsList from "./MapsList.jsx";
import MapsContainer from "./MapsContainer.jsx";



export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-3"><MapsList/></div>
	     			<div className="col-sm-9"><MapsContainer /></div>
	     			
	     		</div>
	      	</div>
	    );
  	}
});