import React from "react";
import ReactDOM from "react-dom";

import { listSolicitationNumbers } from "./../../Redux/Actions/VereadorActions.jsx";

import { connect } from "react-redux";

import store from "./../../Redux/Store.jsx";

@connect((store) => {
	return {
		solicitacoes: store.solicitacao
	};
})
export default class SolicitationNumber extends React.Component{
	componentWillMount(){

		store.subscribe(()=>{
			this.setState({
				numbers:store.getState().vereador.numbers
			});
				
		});

		this.props.dispatch(listSolicitationNumbers(localStorage.vereadorId));

	}
  	render() {
  		if(!this.state){
  			return(<div></div>);
  		}
  		if(!this.state.numbers){
  			return(<div></div>);
  		}
  		console.log(this.state.numbers);
	    return (
	     	<div className="dashboardWidget">
	     		<h4 className="dashboardWidgetTitle">Resumo das solicitações</h4>

	     		<div className="row solicitationNumbers">

	     			

	     			<div className="solicitationNumbersItens">
	     				<span className="solicitationSubtitle">Solicitações resolvidas: </span>
	     				<span className="solicitationNumber">{this.state.numbers.numeroSolicitacoesResolvidas}</span>
	     			</div>
	     			<div className="solicitationNumbersItens">
	     				<span className="solicitationSubtitle">Solicitações em andamento: </span>
	     				<span className="solicitationNumber">{this.state.numbers.numeroSolicitacoesEmAndamento}</span>
	     			</div>

	     			<div className="solicitationNumbersItens">
	     				<span className="solicitationSubtitle">Solicitações aguardando: </span>
	     				<span className="solicitationNumber">{this.state.numbers.nuemroSolicitacoesPendentes}</span>
	     			</div>
					
					<div className="solicitationNumbersItens">
	     				<span className="solicitationSubtitle">Solicitações não resolvidas: </span>
	     				<span className="solicitationNumber">{this.state.numbers.numeroSolicitacoesNaoResolvidas}</span>
	     			</div>
	     			<div className="linhaDivisoria marginTop15"></div>

	     			<div className="solicitationNumbersItens ">
	     				<span className="solicitationSubtitle">Total de Solicitações: </span>
	     				<span className="solicitationNumber">{this.state.numbers.numeroSolicitacoes}</span>
	     			</div>
	     		</div>
	      	</div>
	    );
  	}
}