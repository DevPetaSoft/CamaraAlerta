import React from "react";
import ReactDOM from "react-dom";

import {Link} from 'react-router';

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="sideMenu">
	     		<div className="sideMenuHeader">
		     		<img src="public/images/logotipo.svg" className="perfilImage"/>
		     		<div className="sideMenuHeaderText"> <span className="bold">Nome:</span> Vereador 1</div>
		     		<div className="sideMenuHeaderText"> <span className="bold">E-mail:</span> vereador@gmail.com</div>
	     		</div>
	     		<hr/>
	     		<li>
	     			<Link to="/dashboard" ><ul className="sideMenuItens" >Painel de bordo</ul></Link>
	     			<Link to="/solicitations" ><ul activeClassName="active" className="sideMenuItens">Solicitações<span className="sideMenuItensNumber">2</span></ul></Link>
	     			<ul activeClassName="active" className="sideMenuItens">Mensagens<span className="sideMenuItensNumber">3</span></ul>
	     			<ul activeClassName="active" className="sideMenuItens">Mapas</ul>
	     			<ul activeClassName="active" className="sideMenuItens">Editar Perfil</ul>
	     			<ul activeClassName="active" className="sideMenuItens">Configurações</ul>
	     		</li>

	      	</div>
	    );
  	}
});