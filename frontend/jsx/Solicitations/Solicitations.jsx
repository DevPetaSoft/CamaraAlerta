import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";
import SolicitationList from "./../Dashboard/Widgets/SolicitationList.jsx";


export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-3"><SolicitationList/></div>
	     			
	     		</div>
	      	</div>
	    );
  	}
});