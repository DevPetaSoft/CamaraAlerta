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

import { listarTodos } from "./../../Redux/Actions/EstadoActions.jsx";
import { criarCidade } from "./../../Redux/Actions/CidadeActions.jsx";

@connect((store) => {
	return {
		estado: store.estado
	};
})
export default class CadastroCidade extends React.Component{
	constructor(props){

		super(props);
		this.state={
			nome:"",
			estado:"",
			estados:[]
		};
	}
	componentDidMount(){
		store.subscribe(()=>{
			var storeState = store.getState();
			this.setState({
				estado:storeState.estado.estados[0].id.toString(),
				estados:storeState.estado.estados
			});
		});

		// Listar todos estados
		this.props.dispatch(listarTodos());	

	}

	handleEvent(code,event){
		//Preenche os valores dos inputs
   		this.setState({ [code]: event.target.value });
	}

	sendCidade(){
		if(this.state.nome !== ""){

			this.props.dispatch(criarCidade(this.state));
		}
	}

  	render() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-offset-3 col-sm-6 novaCidadeBackground">
	     				<h4 className="profileTitle">Nova cidade</h4>
	     				<div className="loginPanel">
		     				
	     					<Input 
				     		    onChange={this.handleEvent.bind(this,"nome")} 
		     				    hint="Nome" 
		     				    ref="nome" 
				     		    value={this.state.nome}
				     		    type="text"/>
				     		<Select value={this.state.estado} onChange={this.handleEvent.bind(this,"estado")} >
				     		{this.state.estados.map((estado,idx)=>{
				     			return(<Option key={idx} value={estado.id.toString()} label={estado.nome}/>);
				     		})}
				     		</Select>
		     				<button className="configurationButton" onClick={this.sendCidade.bind(this)}><img src="public/icons/send.svg" /></button>

		     			</div>
	     			</div>
	     			
	     		</div>
	      	</div>
	    );
  	}
}