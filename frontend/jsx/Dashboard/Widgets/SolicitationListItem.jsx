import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
	componentDidMount(){
		console.log(this.props);

	},
  	render: function() {
	    return (
	     	<div className="solicitationListItemBackground">
	     		<div><span>Id:</span>{this.props.solicitacao.id}</div>
	     		<div><span>Solicitante:</span>{this.props.solicitacao.cidadao.nome}</div>
	     		<div><span>Titulo:</span>{this.props.solicitacao.titulo}</div>
	     		<div><span>Data:</span> {this.props.solicitacao.data}</div>
	      	</div>
	    );
  	}
});