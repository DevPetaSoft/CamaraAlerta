import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Checkbox from 'muicss/lib/react/checkbox';

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-offset-3 col-sm-6 configurationBackground">
	     				<h4 className="profileTitle">Configurações</h4>
	     				<Form className="loginPanel">
		     				
		     				<Checkbox name="solicitationNotification" label="Habilitar notificação por nova solicitação" defaultChecked={true} />
		     				<Checkbox name="messageNotification" label="Habilitar notificação por nova mensagem" defaultChecked={true} />

		     				<button className="configurationButton"><img src="public/icons/send.svg" /></button>

		     			</Form>
	     			</div>
	     			
	     		</div>
	      	</div>
	    );
  	}
});