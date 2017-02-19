import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import Option from 'muicss/lib/react/option';

import store from "./../../Redux/Store.jsx";

import { listarTodos } from "./../../Redux/Actions/CidadeActions.jsx";
import { criarVereador } from "./../../Redux/Actions/VereadorActions.jsx";

@connect((store) => {
	return {
		cidade: store.cidade
	};
})
export default class CadastroVereador extends React.Component{
	constructor(props){

		super(props);
		this.state={
			nome:"",
			email:"",
			cpf:"",
			senha: "",
			confirmarSenha:"",
			cidade:"",
			cidades:[]
		};
	}
	componentDidMount(){
		store.subscribe(()=>{
			var storeState = store.getState();
			console.log(storeState.cidade.cidades);
			this.setState({
				cidade:storeState.cidade.cidades[0].id.toString(),
				cidades:storeState.cidade.cidades
			});
		});

		// Listar todas cidades
		this.props.dispatch(listarTodos());	

	}

	handleEvent(code,event){
		//Preenche os valores dos inputs
   		this.setState({ [code]: event.target.value });
	}

	sendVereador(){
		if(this.state.nome === ""){

			return;
		}
		if(this.state.email ===""){
			return;
		}
		if(this.state.cpf === ""){
			return;
		}
		if(this.state.senha === ""){
			return;
		}
		if(this.state.confirmarSenha === ""){
			return;
		}
		if(this.state.senha === this.state.confirmarSenha){
			console.log(this.state);
			this.props.dispatch(criarVereador(this.state));
		}
	}

  	render() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-offset-3 col-sm-6 vereadorBackground">
	     				<h4 className="profileTitle">Novo vereador</h4>
	     				<div className="loginPanel">
		     				
	     					<Input 
				     		    onChange={this.handleEvent.bind(this,"nome")} 
		     				    hint="Nome" 
		     				    ref="nome" 
				     		    value={this.state.nome}
				     		    type="text"/>
				     		<Input 
				     		    onChange={this.handleEvent.bind(this,"email")} 
		     				    hint="E-mail" 
		     				    ref="email" 
				     		    value={this.state.email}
				     		    type="text"/>
				     		<Input 
				     		    onChange={this.handleEvent.bind(this,"cpf")} 
		     				    hint="CPF" 
		     				    ref="cpf" 
				     		    value={this.state.cpf}
				     		    type="text"/>
							
							<Select value={this.state.cidade} onChange={this.handleEvent.bind(this,"cidade")} >
				     		{this.state.cidades.map((cidade,idx)=>{
				     			return(<Option key={idx} value={cidade.id.toString()} label={cidade.nome}/>);
				     		})}
				     		</Select>
				     		<Input 
				     		    onChange={this.handleEvent.bind(this,"senha")} 
		     				    hint="Senha" 
		     				    ref="senha" 
				     		    value={this.state.senha}
				     		    type="password"/>

				     		<Input 
				     		    onChange={this.handleEvent.bind(this,"confirmarSenha")} 
		     				    hint="Confirmar senha" 
		     				    ref="confirmarSenha" 
				     		    value={this.state.confirmarSenha}
				     		    type="password"/>
		     				<button className="configurationButton" onClick={this.sendVereador.bind(this)}><img src="public/icons/send.svg" /></button>

		     			</div>
	     			</div>
	     			
	     		</div>
	      	</div>
	    );
  	}
}