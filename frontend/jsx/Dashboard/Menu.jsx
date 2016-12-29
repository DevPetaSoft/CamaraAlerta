import React from "react";
import ReactDOM from "react-dom";

import {Link} from 'react-router';

export default class Menu extends React.Component{

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
	     			<ul ><Link to="/dashboard" activeClassName="sideMenuItensActive" className="sideMenuItens">Painel de bordo</Link></ul>
	     			<ul ><Link to="/solicitations" className="sideMenuItens" activeClassName="sideMenuItensActive"  >Solicitações<span className="sideMenuItensNumber">2</span></Link></ul>
	     			<ul ><Link to="/messages" className="sideMenuItens" activeClassName="sideMenuItensActive">Mensagens<span className="sideMenuItensNumber">3</span></Link></ul>
	     			<ul ><Link to="/maps" className="sideMenuItens" activeClassName="sideMenuItensActive">Mapas</Link></ul>
	     			<ul ><Link to="/editProfile" className="sideMenuItens" activeClassName="sideMenuItensActive">Editar Perfil</Link></ul>
	     			<ul ><Link to="/configuration" className="sideMenuItens" activeClassName="sideMenuItensActive">Configurações</Link></ul>
	     		</li>

	      	</div>
	    );
  	}
}