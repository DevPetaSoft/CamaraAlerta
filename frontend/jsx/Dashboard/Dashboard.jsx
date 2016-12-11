import React from "react";
import ReactDOM from "react-dom";

import Menu from "./Menu.jsx";
import TopMenu from "./TopMenu.jsx";

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>
	      	</div>
	    );
  	}
});