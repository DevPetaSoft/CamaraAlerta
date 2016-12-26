import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-offset-3 col-sm-6 profileBackground">
	     				<h4 className="profileTitle">Editar Perfil</h4>
	     				<Form className="loginPanel">
		     				<label>Nome:</label><br/>
		     				<Input hint="Nome"/>
		     				<label>CPF:</label><br/>
		     				<Input hint="CPF"/>
		     				<label>Telefone:</label><br/>
		     				<Input hint="Telefone"/>


		     				<button className="profileEditButton"><img src="public/icons/send.svg" /></button>

		     			</Form>
	     			</div>
	     			
	     		</div>
	      	</div>
	    );
  	}
});