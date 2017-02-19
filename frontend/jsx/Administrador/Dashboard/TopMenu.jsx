import React from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router";

export default React.createClass({
	logout(){
		localStorage.setItem("administradorNome",null);
		localStorage.setItem("administradorEmail",null);
		localStorage.setItem("administradorId",null);
		location.assign("/AdminLogin");
	},

  	render: function() {
	    return (
	     	<div className="topMenu">
	     		<img className="topMenuImage" src="public/images/logotipo.svg"/>
	     		<div className="logout" onClick={this.logout}>Sair <img src="public/icons/login-variant.svg" /></div>
	      	</div>
	    );
  	}
});