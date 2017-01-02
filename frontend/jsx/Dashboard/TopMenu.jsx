import React from "react";
import ReactDOM from "react-dom";

import { Link } from "react-router";

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="topMenu">
	     		<img className="topMenuImage" src="public/images/logotipo.svg"/>
	     		<div className="logout"><Link to="/">Sair <img src="public/icons/login-variant.svg" /></Link></div>
	      	</div>
	    );
  	}
});