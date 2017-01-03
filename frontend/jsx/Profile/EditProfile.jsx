import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import { listVereadorProfile, editProfile } from "./../Redux/Actions/VereadorActions.jsx";

import { connect } from "react-redux";

import store from "./../Redux/Store.jsx";

@connect((store) => {
	return {
		vereador: store.vereador
	};
})
export default class EditProfile extends React.Component{
	componentDidMount(){
		store.subscribe(()=>{
			this.setState({
				vereador: store.getState().vereador.vereador
			});
			console.log(this.state);
		});
		this.props.dispatch(listVereadorProfile(localStorage.vereadorId));
	}

	handleEvent(code,event){
		
		//Preenche os valores dos inputs
		this.refs[code].setState({
		    innerValue: event.target.value
		});

	}


	sendProfile(){
		var nome, telefone, cpf;
		if(this.refs.nome.state == null){
			nome = this.state.vereador.nome;
		}else{
			nome = this.refs.nome.state.innerValue;
		}
		if(this.refs.telefone.state == null){
			telefone = this.state.vereador.telefone;
		}else{
			telefone = this.refs.telefone.state.innerValue;
		}
		if(this.refs.cpf.state == null){
			cpf = this.state.vereador.cpf;
		}else{
			cpf = this.refs.cpf.state.innerValue;
		}
		//Mudar o local da alteracao
		localStorage.setItem("vereadorNome",nome);
		this.props.dispatch(editProfile(localStorage.vereadorId, nome, telefone, cpf));
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
	     			<div className="col-sm-offset-3 col-sm-6 profileBackground">
	     				<h4 className="profileTitle">Editar Perfil</h4>
	     				<div className="loginPanel">
		     				<label>Nome:</label><br/>
		     				<Input hint="Nome" defaultValue={this.state.vereador.nome} ref="nome" onChange={this.handleEvent.bind(this,"nome")}/>
		     				<label>CPF:</label><br/>
		     				<Input hint="CPF" defaultValue={this.state.vereador.cpf} ref="cpf" onChange={this.handleEvent.bind(this,"cpf")}/>
		     				<label>Telefone:</label><br/>
		     				<Input hint="Telefone" defaultValue={this.state.vereador.telefone} ref="telefone" onChange={this.handleEvent.bind(this,"telefone")}/>

		     				<button className="profileEditButton" onClick={this.sendProfile.bind(this)}><img src="public/icons/send.svg" /></button>

		     			</div>
	     			</div>
	     			
	     		</div>
	      	</div>
	    );
  	}
}