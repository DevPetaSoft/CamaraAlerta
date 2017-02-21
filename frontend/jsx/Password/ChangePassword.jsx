import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import Footer from "./../Footer.jsx";

import {Link} from 'react-router';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import { trocarSenha } from "./../Redux/Actions/VereadorActions.jsx";

var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


import store from "./../Redux/Store.jsx";


@connect((store) => {
	return {
		vereador: store.vereador
	};
})
export default class ChangePassword extends React.Component {
	constructor(props){

		super(props);
		this.state={
			email:"",
			token: "",
			password:"",
			confirmPassword:""
		};
	}
	componentWillMount(){
		
		store.subscribe(()=>{
			var storeState = store.getState();
			if(storeState.vereador.trocarSenha !== "Ok"){
				this.refs.container.error(
		      	  storeState.vereador.trocarSenha,
			      "", {
			      timeOut: 30000,
			      extendedTimeOut: 10000
			    });
			}else{
				this.refs.container.success(
			      "Senha trocada com sucesso!!",
			      "", {
			      timeOut: 30000,
			      extendedTimeOut: 10000
			    });
			    location.assign("./");
			}
		});


	}

	changePassword(){


		if(this.state.password === this.state.confirmPassword){

			this.props.dispatch(trocarSenha(this.state.email,this.state.token,this.state.password));
		}else{
			this.refs.container.error(
		      "A senha informada não é igual a senha digitada no campo confirmar senha!",
		      "", {
		      timeOut: 30000,
		      extendedTimeOut: 10000
		    });
		}
	}

	handleEvent(code,event){
		//Preenche os valores dos inputs
   		this.setState({ [code]: event.target.value });

	}

  	render() {

	    return (
	     	<div className="loginBackground">
	     		<ToastContainer ref="container"
	                        toastMessageFactory={ToastMessageFactory}
	                        className="toast-top-right" />
		     	<div className="col-sm-offset-3 col-sm-6">

		     	<img className="loginLogotype" src="public/images/logotipo.svg"/>
	     			<div className="loginPanel">
	     				<p className="forgetPassword">Para recuperar sua senha digite o e-mail de sua conta:</p>
	     				<label>E-mail:</label><br/>
	     				<Input 
			     		    onChange={this.handleEvent.bind(this,"email")} 
	     				    hint="E-mail" 
	     				    ref="email" 
			     		    value={this.state.email}
			     		    type="email"/>
			     		<label>Token:</label><br/>
			     		<Input 
			     		    onChange={this.handleEvent.bind(this,"token")} 
	     				    hint="Token" 
	     				    ref="token" 
			     		    value={this.state.token}
			     		    type="text"/>

			     		<label>Nova senha:</label><br/>
			     		<Input 
			     		    onChange={this.handleEvent.bind(this,"password")} 
	     				    hint="Nova senha" 
	     				    ref="token" 
			     		    value={this.state.password}
			     		    type="password"/>

			     		<label>Confirmar nova senha:</label><br/>
			     		<Input 
			     		    onChange={this.handleEvent.bind(this,"confirmPassword")} 
	     				    hint="Confirmar nova senha" 
	     				    ref="confirmPassword" 
			     		    value={this.state.confirmPassword}
			     		    type="password"/>
						
						<Link to="/">Voltar para tela de login</Link>
	     				<button className="loginButton" onClick={this.changePassword.bind(this)} ><img src="public/icons/send.svg" /></button>
	     			
	     			</div>
	     		</div>
	      	</div>
	    );
  	}
}



