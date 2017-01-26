import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="mapsListItemBackground">
	     		<div><span>Solicitante:</span>{this.props.solicitacao.cidadao.nome}</div>
	     		<div><span>Assunto:</span> {this.props.solicitacao.titulo}</div>
	     		<div><span>Data criação:</span>{this.props.solicitacao.data}</div>
	      	</div>
	    );
  	}
});