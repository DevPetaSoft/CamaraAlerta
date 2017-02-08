import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import MessageChatItem from "./MessageChatItem.jsx";

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import { connect } from "react-redux";


import { novaMensagem } from "./../Redux/Actions/CanalDeComunicacaoActions.jsx";

import store from "./../Redux/Store.jsx";



@connect((store) => {
	return {
		solicitacoes: store.solicitacao
	};
})
export default class SolicitationList extends React.Component{
	componentDidMount(){

		store.subscribe(()=>{
			var storeState = store.getState();
			this.setState({
				listaMensagens : storeState.canalComunicacao.listaDeMensagens,
				canalComunicacao: storeState.canalComunicacao.canalComunicacaoSelecionado
			});
		});
	}

	sendMessage(){
		var mensagem = "";
		if(this.state.value){		
			mensagem = this.state.value;
		}
		this.props.dispatch(novaMensagem(this.state.canalComunicacao.id, mensagem));
		this.setState({
			value: ""
		});
	}

	handleEvent(code,event){
		
		//Preenche os valores dos inputs
		this.setState({
			value: event.target.value
		});

	}

  	render() {
  		if(!this.state){
  			return(<div className="messageBoardBackground">
  				Nenhuma bate-papo selecionado
  				</div>)
  		}
  		if(!this.state.canalComunicacao ){
  			return(<div className="messageBoardBackground">
  				Nenhuma bate-papo selecionado
  				</div>)
  		}
	    return (
	     	<div className="messageBoardBackground">
	     		<h4>{this.state.canalComunicacao.denuncia.titulo}</h4>
	     		<div className="messageBoardBackgroundContainer">

		     		<div className="messageInputBlock">
		     			<div className="messagesBlock">
		     				{this.state.listaMensagens.map((mensagem,idx) =>{
		     					return(<MessageChatItem key={idx} yoursefl={(mensagem.enviadoPor == 0)?(true):(false)} mensagem={mensagem}/>)
		     				})
		     				}
		     			</div>
		     			
			     		<Input 
			     		    onChange={this.handleEvent.bind(this,"message")} 
			     		    ref="message" 
			     		    hint="Digite sua mensagem aqui..." 
			     		    value={this.state.value}
			     		    className="messageInput col-md-10"/>
			     		<button onClick={this.sendMessage.bind(this)} className="messageButton col-md-2"><img src="public/icons/send.svg" /></button>
		     		</div>

	     		</div>

	      	</div>
	    );
  	}
}