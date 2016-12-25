import React from "react";
import ReactDOM from "react-dom";

import {Map, MarkerGroup} from "react-d3-map";



export default React.createClass({
	getInitialState(){
		return{
		
		}
	},
  	render: function() {
	    return (
	     	<div className="dashboardWidget">
	     		<h4 className="dashboardWidgetTitle">Mapa de solicitações</h4>

	      	</div>
	    );
  	}
});