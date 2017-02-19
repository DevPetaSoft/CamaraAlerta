import React from "react";
import ReactDOM from "react-dom";


export default class ReportHistory extends React.Component{
	getStatus(status){
		if(status === 0){
			return "Pendente";
		}else if(status === 1){
			return "Em andamento";
		}else if(status === 2){
			return "Finalizada com sucesso";
		}else if(status === 3){
			return "Não resolvida(ou recusada)";
		}

	}

  	render() {
	    return (
	     	<div className="reportHistory">
	     		<p><span>Status:</span><span> {this.getStatus(this.props.historico.status)}</span></p>
	     		<p><span>Relatório:</span> {this.props.historico.relatorio} </p>
	     		<p><span>Data:</span> {this.props.historico.dataCriacao} </p>

	      	</div>
	    );
  	}
}