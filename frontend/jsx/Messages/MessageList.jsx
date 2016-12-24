import React from "react";
import ReactDOM from "react-dom";

import MessageItem from "./MessageItem.jsx";


export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardWidgetList">
	     		<h4 className="dashboardWidgetTitle">Lista de mensagens</h4>
	     		<MessageItem />
	     		<MessageItem />
	      	</div>
	    );
  	}
});