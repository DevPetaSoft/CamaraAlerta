import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import Footer from "./../Footer.jsx";

import {Link} from 'react-router';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import { gerarToken } from "./../Redux/Actions/VereadorActions.jsx";

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
export default class Login extends React.Component {
	constructor(props){

		super(props);
		this.state={
			value:""
		};
	}
	componentWillMount(){
		
		store.subscribe(()=>{
			var storeState = store.getState();
			this.setState({
				gerouToken : storeState.vereador.gerouToken,
			});

			if(storeState.vereador.gerouToken == "Ok" ){
				this.refs.container.success(
			      "E-mail enviado com sucesso, verifique para dar continuidade na troca de senha!!",
			      "", {
			      timeOut: 30000,
			      extendedTimeOut: 10000
			    });
			}else{
				this.refs.container.error(
			      storeState.vereador.gerouToken,
			      "", {
			      timeOut: 30000,
			      extendedTimeOut: 10000
			    });
			}
		});


	}

	sendEmail(){

		// Dispara o evento para gerar token
		this.props.dispatch(gerarToken(this.state.value));
	}

	handleEvent(code,event){
		
		//Preenche os valores dos inputs
		this.setState({
			value: event.target.value
		});

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
			     		    onChange={this.handleEvent.bind(this,"message")} 
	     				    hint="email" 
	     				    ref="email" 
			     		    value={this.state.value}
			     		    type="email"/>

	     				<button className="loginButton" onClick={this.sendEmail.bind(this)} ><img src="public/icons/send.svg" /></button>
	     			
	     			</div>
	     		</div>
	     		<Footer/>
	      	</div>
	    );
  	}
}



