import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import Footer from "./Footer.jsx";

import {Link} from 'react-router';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import { vereadorLogin } from "./Redux/Actions/VereadorActions.jsx";


import store from "./Redux/Store.jsx";


@connect((store) => {
	return {
		vereador: store.vereador
	};
})
export default class Login extends React.Component {
	componentWillMount(){
		
		store.subscribe(()=>{
			var state = store.getState();
			console.log(localStorage);
			if(typeof state.vereador.vereador === "object" ){
				
				localStorage.setItem("vereadorNome",state.vereador.vereador.nome);
				localStorage.setItem("vereadorEmail",state.vereador.vereador.email);
				localStorage.setItem("vereadorId",state.vereador.vereador.id);
				location.assign("/dashboard");
			}else{
				console.log("error");
			}
			console.log(store.getState())
			}
		);


	}

	login(){
		var email = undefined;
		var senha = undefined;
		if(this.refs.email.state){
			email = this.refs.email.state.innerValue;
		}

		if(this.refs.senha.state){
			senha = this.refs.senha.state.innerValue;
		}
		
		this.props.dispatch(vereadorLogin(email, senha));
	}

	handleEvent(code,event){
		
		//Preenche os valores dos inputs
		this.refs[code].setState({
		    innerValue: event.target.value
		});

	}

  	render() {
  		if(this.props.vereador.vereador != null){
  			location.assign("/dashboard");
  		}
	    return (
	     	<div className="loginBackground">

	     		<div className="col-sm-offset-3 col-sm-6">

	     		<img className="loginLogotype" src="public/images/logotipo.svg"/>
	     			<div className="loginPanel">
	     				<label>E-mail:</label><br/>
	     				<Input hint="email" ref="email" type="email" onChange={this.handleEvent.bind(this,"email")}/>
	     				<label>Senha:</label><br/>
	     				<Input hint="password" ref="senha" type="password" onChange={this.handleEvent.bind(this,"senha")}/>

	     				<button className="loginButton" onClick={this.login.bind(this)}><img src="public/icons/login-variant.svg" /></button>
	     			
	     			</div>
	     			

	     		</div>
	     		<Footer/>
	      	</div>
	    );
  	}
}



