import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="sideMenu">
	     		<img src="public/images/logotipo.svg" className="perfilImage"/>
	     		<div> Nome: <span>Vereador 1</span></div>
	     		<div> E-mail: <span>vereador@gmail.com</span></div>
	     		<hr/>
	     		<li>
	     			<ul>Painel de bordo</ul>
	     			<ul>Solicitações</ul>
	     			<ul>Mensagens</ul>
	     			<ul>Mapas</ul>
	     			<ul>Editar Perfil</ul>
	     			<ul>Configurações</ul>
	     		</li>

	      	</div>
	    );
  	}
});