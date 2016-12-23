import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";
import SolicitationList from "./../Dashboard/Widgets/SolicitationList.jsx";


export default React.createClass({
  	render: function() {
	    return (
	     	<div className="solicitationBackground">

	     		<div className="col-sm-6">

		     		<h4>Titulo</h4>
		     		<p>Titulo solicitação</p>

		     		<h4>Descrição</h4>
		     		<p className="solicitationDescription">
		     		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt efficitur pellentesque. 
		     		Ut eu orci id sapien viverra elementum. Morbi tristique nisi vel tellus cursus, sit amet interdum ligula
		     		suscipit. Donec elit turpis, condimentum a lacus ut, laoreet imperdiet ex. Duis vitae dolor tempus, finibus
		     		tellus a, sollicitudin augue. Nullam in ullamcorper velit, et accumsan turpis. Nunc suscipit imperdiet sagittis. 
		     		Etiam quis felis est. Aenean ut velit elit. Ut aliquam lectus non libero vulputate, a facilisis nisl mattis. Nunc id 
		     		neque sed mi ultricies scelerisque. Phasellus consectetur tortor a mauris malesuada, at ultrices neque ullamcorper. 
		     		</p>

		     		<h4>Autor</h4>
		     		<p>Autor<button className="contactButton">Entrar em contato</button></p>

		     		<h4>Status</h4>
		     		<p>Pendente</p>

		     		<button className="col-sm-offset-3 col-sm-6">Responder</button>

	     		</div>


	     		<div className="col-sm-6">

	     		<div className="col-sm-12">
	     			<img className="solicitationImage" src="public/images/buracos-na-rua.jpeg" />
	     		</div>

	     		<div className="col-sm-4">
	     			<img className="solicitationImageSecundary" src="public/images/buracos-na-rua.jpeg" />
	     		</div>

	     		<div className="col-sm-4">
		     		<img className="solicitationImageSecundary" src="public/images/buracos-na-rua.jpeg" />
	     		</div>

	     		<div className="col-sm-4">
		     		<img className="solicitationImageSecundary" src="public/images/buracos-na-rua.jpeg" />
	     		</div>

	     		<div className="col-sm-12">
	     			<img className="solicitationImage" src="public/images/google-maps-ios.png" />
	     		</div>

	     		</div>
	      	</div>
	    );
  	}
});