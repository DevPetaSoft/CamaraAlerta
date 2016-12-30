import React from "react";
import ReactDOM from "react-dom";

import SolicitationListItem from "./SolicitationListItem.jsx"; 

import { listagemSolicitacao } from "./../../Redux/Actions/SolicitacaoActions.jsx";

import { connect } from "react-redux";

import store from "./../../Redux/Store.jsx";

@connect((store) => {
	return {
		solicitacoes: store.solicitacao
	};
})
export default class SolicitationList extends React.Component{

	componentWillMount(){

		store.subscribe(()=>{
			this.setState({
				solicitacoes:store.getState().solicitacao.solicitacoes
			});
		});

		this.props.dispatch(listagemSolicitacao(localStorage.vereadorId));

	}

  	render() {
	    return (
	     	<div className="dashboardWidgetList">
	     		<h4 className="dashboardWidgetTitle">Lista de solicitações</h4>
	     		{(this.state.solicitacoes)?(this.state.solicitacoes.map(solicitacao =>{
	     			return (<SolicitationListItem key={solicitacao.id} solicitacao={solicitacao} />)
	     		})):("")}
	      	</div>
	    );
  	}
};