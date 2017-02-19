import React from "react";
import ReactDOM from "react-dom";

import {Link} from 'react-router';



export default class Menu extends React.Component{
	componentDidMount(){

	}

  	render() {
	    return (
	     	<div className="sideMenu">
	     		<div className="sideMenuHeader">
		     		<img src="public/images/logotipo.svg" className="perfilImage"/>
		     		<div className="sideMenuHeaderText"> <span className="bold">Nome:</span> {localStorage.administradorNome}</div>
		     		<div className="sideMenuHeaderText"> <span className="bold">E-mail:</span> {localStorage.administradorEmail}</div>
	     		</div>
	     		<hr/>
	     		<li>
	     			<ul ><Link to="/AdminDashboard" activeClassName="sideMenuItensActive" className="sideMenuItens">Painel de bordo</Link></ul>
	     			<ul ><Link to="/AdminCadastrarEstado" className="sideMenuItens" activeClassName="sideMenuItensActive">Estado</Link></ul>
	     			<ul ><Link to="/AdminCadastrarCidade" className="sideMenuItens" activeClassName="sideMenuItensActive">Cidades</Link></ul>
	     			<ul ><Link to="/AdminCadastrarVereador" className="sideMenuItens" activeClassName="sideMenuItensActive">Vereador</Link></ul>
	     			
	     		</li>

	      	</div>
	    );
  	}
}