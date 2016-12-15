import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="topMenu">
	     		<img className="topMenuImage" src="public/images/logotipo.svg"/>
	     		<div className="logout">Sair <img src="public/icons/login-variant.svg" /></div>
	      	</div>
	    );
  	}
});