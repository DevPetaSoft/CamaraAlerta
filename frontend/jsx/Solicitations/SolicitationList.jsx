import React from "react";
import ReactDOM from "react-dom";

import SolicitationListItem from "./SolicitationListItem.jsx"; 

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardWidgetList">
	     		<h4 className="dashboardWidgetTitle">Lista de solicitações</h4>
	     		<SolicitationListItem />
	     		<SolicitationListItem />
	     		<SolicitationListItem />
	      	</div>
	    );
  	}
});