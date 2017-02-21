import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Checkbox from 'muicss/lib/react/checkbox';


import { listVereadorProfile, editConfiguration } from "./../Redux/Actions/VereadorActions.jsx";

import { connect } from "react-redux";

import store from "./../Redux/Store.jsx";

@connect((store) => {
	return {
		vereador: store.vereador
	};
})

export default class ConfigurationBoard extends React.Component{

	componentDidMount(){
		store.subscribe(()=>{
			this.setState({
				vereador: store.getState().vereador.vereador
			});
		});
		this.props.dispatch(listVereadorProfile(localStorage.vereadorId));
	}

	handleEvent(code,event){
		//Preenche os valores dos inputs
		this.refs[code].setState({
		    innerValue: event.target.checked
		});
	}

	sendProfile(){
		var solicitationNotification, messageNotification;
		if(this.refs.solicitationNotification.state == null){
			solicitationNotification = this.state.vereador.notificacaoSolicitacao;
		}else{
			solicitationNotification = this.refs.solicitationNotification.state.innerValue;
		}
		if(this.refs.messageNotification.state == null){
			messageNotification = this.state.vereador.notificacaoMensagem;
		}else{
			messageNotification = this.refs.messageNotification.state.innerValue;
		}
		this.props.dispatch(editConfiguration(localStorage.vereadorId, solicitationNotification, messageNotification));
	}

  	render() {
  		if(!this.state){
			return(<div></div>);
		}
		if(!this.state.vereador){
			return(<div></div>);
		}
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-offset-3 col-sm-6 configurationBackground">
	     				<h4 className="profileTitle">Configurações</h4>
	     				<div className="loginPanel">
		     				
		     				<Checkbox 
		     					name="solicitationNotification" 
		     					label="Habilitar notificação por nova solicitação" 
		     					ref="solicitationNotification"
		     					onChange={this.handleEvent.bind(this,"solicitationNotification")} 
		     					defaultChecked={this.state.vereador.notificacaoSolicitacao} />
		     				<Checkbox 
		     					name="messageNotification" 
		     					label="Habilitar notificação por nova mensagem"
		     					ref="messageNotification" 
		     					onChange={this.handleEvent.bind(this,"messageNotification")} 
		     					defaultChecked={this.state.vereador.notificacaoMensagem} />

		     				<button className="configurationButton" onClick={this.sendProfile.bind(this)}><img src="public/icons/check.svg" /></button>

		     			</div>
	     			</div>
	     			
	     		</div>
	      	</div>
	    );
  	}
}