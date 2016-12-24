import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import MessageList from "./MessageList.jsx";
import MessageBoard from "./MessageBoard.jsx";


export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-3"><MessageList/></div>
	     			<div className="col-sm-9"><MessageBoard /></div>
	     			
	     		</div>
	      	</div>
	    );
  	}
});