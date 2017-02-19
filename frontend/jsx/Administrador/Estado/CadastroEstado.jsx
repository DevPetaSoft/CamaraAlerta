import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import store from "./../../Redux/Store.jsx";

import { criarEstado } from "./../../Redux/Actions/EstadoActions.jsx";

@connect((store) => {
	return {
		estado: store.estado
	};
})
export default class CadastroEstado extends React.Component{
	constructor(props){

		super(props);
		this.state={
			nome:"",
		};
	}
	componentDidMount(){
		store.subscribe(()=>{
			var storeState = store.getState();
		});
	}

	handleEvent(code,event){
		
		//Preenche os valores dos inputs
   		this.setState({ [code]: event.target.value });
	}

	sendEstado(){
		console.log(this.state);
		if(this.state.nome !== ""){

			this.props.dispatch(criarEstado(this.state.nome));	
		}
	}

  	render() {

	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-offset-3 col-sm-6 configurationBackground">
	     				<h4 className="profileTitle">Novo estado</h4>
	     				<div className="loginPanel">
		     				
	     					<Input 
				     		    onChange={this.handleEvent.bind(this,"nome")} 
		     				    hint="Nome" 
		     				    ref="nome" 
				     		    value={this.state.nome}
				     		    type="text"/>
		     				<button className="configurationButton" onClick={this.sendEstado.bind(this)}><img src="public/icons/send.svg" /></button>

		     			</div>
	     			</div>
	     			
	     		</div>
	      	</div>
	    );
  	}
}