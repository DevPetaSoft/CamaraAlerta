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
	    return (
	     	<div className="dashboardWidget">
	     		<h4 className="dashboardWidgetTitle">Número de solicitações</h4>

	     		<div className="row solicitationNumbers">

	     			<div className="col-md-4 textAlignCenter">
	     				<span className="solicitationNumber">{this.state.numbers.numeroSolicitacoes}</span>
	     				<br/>
	     				<span className="solicitationSubtitle">Solicitações recebidas</span>
	     			</div>

	     			<div className="col-md-4 textAlignCenter">
	     				<span className="solicitationNumber">{this.state.numbers.numeroSolicitacoesResolvidas}</span>
	     				<br/>
	     				<span className="solicitationSubtitle">Solicitações resolvidas</span>
	     			</div>

	     			<div className="col-md-4 textAlignCenter">
	     				<span className="solicitationNumber">{this.state.numbers.nuemroSolicitacoesPendentes}</span>
	     				<br/>
	     				<span className="solicitationSubtitle">Solicitações aguardando</span>
	     			</div>
	     		</div>
	      	</div>
	    );
  	}
}