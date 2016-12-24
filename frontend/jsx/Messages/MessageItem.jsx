import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="messageListItemBackground">
	     		<div><span>Solicitante:</span>Gustavo</div>
	     		<div><span>Titulo:</span>Solicitação teste</div>
	     		<div><span>Ultima mensagem:</span> 24/12/2016</div>
	      	</div>
	    );
  	}
});