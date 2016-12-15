import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardWidget">
	     		<h4 className="dashboardWidgetTitle">Número de solicitações</h4>

	     		<div className="row solicitationNumbers">

	     			<div className="col-md-4 textAlignCenter">
	     				<span className="solicitationNumber">40</span>
	     				<br/>
	     				<span className="solicitationSubtitle">Solicitações recebidas</span>
	     			</div>

	     			<div className="col-md-4 textAlignCenter">
	     				<span className="solicitationNumber">20</span>
	     				<br/>
	     				<span className="solicitationSubtitle">Solicitações resolvidas</span>
	     			</div>

	     			<div className="col-md-4 textAlignCenter">
	     				<span className="solicitationNumber">20</span>
	     				<br/>
	     				<span className="solicitationSubtitle">Solicitações aguardando</span>
	     			</div>
	     		</div>
	      	</div>
	    );
  	}
});