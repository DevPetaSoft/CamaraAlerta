import React from "react";
import ReactDOM from "react-dom";

import MessageItem from "./MessageItem.jsx";

import { connect } from "react-redux";

import { listarCanais, listarMensagens } from "./../Redux/Actions/CanalDeComunicacaoActions.jsx";

import store from "./../Redux/Store.jsx";

@connect((store) => {
	return {
		canalComunicacao: store.canalComunicacao
	};
})
export default class MessageList extends React.Component{
	componentDidMount(){

		store.subscribe(()=>{
			this.setState({
				listaDeCanais: store.getState().canalComunicacao.listaDeCanais
			});
		});

		this.props.dispatch(listarCanais(localStorage.vereadorId));
	}

	onClickHandler(id){

		this.props.dispatch(listarMensagens(id,localStorage.vereadorId));

	}
  	render() {
  		if(!this.state || !this.state.listaDeCanais){
  			return(<div></div>);

  		}
	    return (
	     	<div className="dashboardWidgetList">
	     		<h4 className="dashboardWidgetTitle">Lista de mensagens</h4>
	     		{(this.state)?(this.state.listaDeCanais.map((canal,idx) =>{
	     			return (<div onClick={this.onClickHandler.bind(this,canal.id)} ><MessageItem key={idx} canal={canal} /></div>)
	     		})):("")}
	     		
	      	</div>
	    );
  	}
}