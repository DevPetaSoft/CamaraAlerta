import React from "react";
import ReactDOM from "react-dom";

import Footer from "./Footer.jsx";

import {Link} from 'react-router';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';


export default React.createClass({
  	render: function() {
	    return (
	     	<div className="loginBackground">

	     		<div className="col-sm-offset-3 col-sm-6">

	     		<img className="loginLogotype" src="public/images/logotipo.svg"/>
	     			<Form className="loginPanel">
	     				<label>E-mail:</label><br/>
	     				<Input hint="email"/>
	     				<label>Senha:</label><br/>
	     				<Input hint="password" type="password"/>

	     			<Link to="/dashboard">
	     				<button className="loginButton"><img src="public/icons/login-variant.svg" /></button>
	     			</Link>
	     			</Form>

	     		</div>
	     		<Footer/>
	      	</div>
	    );
  	}
});



