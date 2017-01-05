import React from "react";
import ReactDOM from "react-dom";

import MapsItem from "./MapsItem.jsx";

import { listagemSolicitacao, listagemUnicaSolicitacao } from "./../Redux/Actions/SolicitacaoActions.jsx";

import { connect } from "react-redux";

import store from "./../Redux/Store.jsx";

@connect((store) => {
	return {
		solicitacoes: store.solicitacao
	};
})
export default class MapsList extends React.Component{
	componentWillMount(){

		store.subscribe(()=>{
			this.setState({
				solicitacoes:store.getState().solicitacao.solicitacoes
			});	
		});

		this.props.dispatch(listagemSolicitacao(localStorage.vereadorId));

	}

  	render() {
  		if(!this.state){
  			return(<div className="dashboardWidgetList"></div>);
  		}
  		if(!this.state.solicitacoes){
  			return(<div className="dashboardWidgetList"></div>);
  		}
	    return (
	     	<div className="dashboardWidgetList">
	     		<h4 className="dashboardWidgetTitle">Lista de pontos de solicitações</h4>
				{(this.state.solicitacoes.map((solicitacao,idx) =>{
	     			return (<div><MapsItem key={idx} solicitacao={solicitacao} /></div>)
	     		}))}
	      	</div>
	    );
  	}
}