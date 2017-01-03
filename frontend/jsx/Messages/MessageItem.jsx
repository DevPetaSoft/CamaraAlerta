import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="messageListItemBackground">
	     		<div><span>Solicitante:</span>{this.props.canal.cidadao.nome}</div>
	     		<div><span>Titulo:</span> {this.props.canal.denuncia.titulo}</div>
	     		<div><span>Data da solicitação:</span>{this.props.canal.denuncia.data}</div>
	      	</div>
	    );
  	}
});