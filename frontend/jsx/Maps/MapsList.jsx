import React from "react";
import ReactDOM from "react-dom";

import MapsItem from "./MapsItem.jsx";


export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardWidgetList">
	     		<h4 className="dashboardWidgetTitle">Lista de pontos de solicitações</h4>
	     		<MapsItem />
	     		<MapsItem />
	      	</div>
	    );
  	}
});