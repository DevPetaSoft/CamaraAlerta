import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardWidget">
	     		<h4>Número de solicitações</h4>
	     		<div className="row">
	     			<div className="col-md-4">
	     				40<br/>
	     				Solicitações recebidas
	     			</div>
	     			<div className="col-md-4">
	     				20<br/>
	     				Solicitações resolvidas
	     			</div>
	     			<div className="col-md-4">
	     				20<br/>
	     				Solicitações aguardando
	     			</div>
	     		</div>
	      	</div>
	    );
  	}
});