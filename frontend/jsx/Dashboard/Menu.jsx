import React from "react";
import ReactDOM from "react-dom";

import {Link} from 'react-router';

import store from "./../Redux/Store.jsx";

import { listagemNovaSolicitacao } from "./../Redux/Actions/VereadorActions.jsx";

import { connect } from "react-redux";

@connect((store) => {
	return {
		numeroDeNovasSolicitacoes: store.vereador.numeroDeNovasSolicitacoes,
		numeroDeNovasMensagens: store.vereador.numeroDeNovasMensagens,
	};
})
export default class Menu extends React.Component{
	componentDidMount(){
		if(localStorage.vereadorId == 'null' || localStorage.vereadorId == undefined){
			location.assign("./");
		}
		store.subscribe(()=>{
			var storeState = store.getState();
			this.setState({
				numeroDeNovasSolicitacoes: storeState.vereador.numeroDeNovasSolicitacoes,
				numeroDeNovasMensagens: storeState.vereador.numeroDeNovasMensagens,
			})

		});

		this.setState({
			numeroDeNovasSolicitacoes: this.props.numeroDeNovasSolicitacoes,
			numeroDeNovasMensagens: this.props.numeroDeNovasMensagens,
		})

		this.props.dispatch(listagemNovaSolicitacao(localStorage.vereadorId));
	}

  	render() {
	    return (
	     	<div className="sideMenu">
	     		<div className="sideMenuHeader">
		     		<img src="public/images/logotipo.svg" className="perfilImage"/>
		     		<div className="sideMenuHeaderText"> <span className="bold">Nome:</span> {localStorage.vereadorNome}</div>
		     		<div className="sideMenuHeaderText"> <span className="bold">E-mail:</span> {localStorage.vereadorEmail}</div>
	     		</div>
	     		<hr/>
	     		<li>
	     			<ul ><Link to="/dashboard" activeClassName="sideMenuItensActive" className="sideMenuItens">Início</Link></ul>
	     			<ul ><Link to="/solicitations" className="sideMenuItens" activeClassName="sideMenuItensActive"  >Solicitações<span className="sideMenuItensNumber">{(this.state)?(this.state.numeroDeNovasSolicitacoes):("0")}</span></Link></ul>
	     			<ul ><Link to="/messages" className="sideMenuItens" activeClassName="sideMenuItensActive">Bate-papo<span className="sideMenuItensNumber">{(this.state)?(this.state.numeroDeNovasMensagens):("0")}</span></Link></ul>
	     			<ul ><Link to="/maps" className="sideMenuItens" activeClassName="sideMenuItensActive">Mapas</Link></ul>
	     			<ul ><Link to="/editProfile" className="sideMenuItens" activeClassName="sideMenuItensActive">Editar Perfil</Link></ul>
	     			<ul ><Link to="/configuration" className="sideMenuItens" activeClassName="sideMenuItensActive">Configurações</Link></ul>
	     		</li>

	      	</div>
	    );
  	}
}