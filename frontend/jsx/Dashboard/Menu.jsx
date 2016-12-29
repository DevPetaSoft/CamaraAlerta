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
	     			<Link to="/dashboard" ><ul className="sideMenuItens" >Painel de bordo</ul></Link>
	     			<Link to="/solicitations" ><ul className="sideMenuItens">Solicitações<span className="sideMenuItensNumber">2</span></ul></Link>
	     			<Link to="/messages"><ul  className="sideMenuItens">Mensagens<span className="sideMenuItensNumber">3</span></ul></Link>
	     			<Link to="/maps"><ul  className="sideMenuItens">Mapas</ul></Link>
	     			<Link to="/editProfile"><ul  className="sideMenuItens">Editar Perfil</ul></Link>
	     			<Link to="/configuration"><ul  className="sideMenuItens">Configurações</ul></Link>
	     		</li>

	      	</div>
	    );
  	}
}