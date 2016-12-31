import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import { connect } from "react-redux";

import store from "./../Redux/Store.jsx";

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";


const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    defaultCenter={{ lat:-21.232756, lng: -44.995004 }}
    onClick={props.onMapClick}
  >

  </GoogleMap>
));

@connect((store) => {
	return {
		solicitacao: store.solicitacao.solicitacaoSelecionada
	};
})
export default class SolicitationDetails extends React.Component{
	componentDidMount(){
		store.subscribe(()=>{
			var solicitacao = store.getState().solicitacao.solicitacaoSelecionada;
			this.setState({
				solicitacao: solicitacao
			
			});
		});
	}
  	render() {
  		if(!this.state){
  			return(
	     	<div className="solicitationBackground">
	     	<h4>Nenhuma solicitação selecionada</h4>
	     	</div>)
  		}
  		if(!this.state.solicitacao){
  			return(
	     	<div className="solicitationBackground">
	     	<h4>Nenhuma solicitação selecionada</h4>
	     	</div>)
  		}
	    return (
	     	<div className="solicitationBackground">

	     		<div className="col-sm-6">

		     		<h4>Titulo</h4>
		     		<p>{this.state.solicitacao.titulo}</p>

		     		<h4>Descrição</h4>
		     		<p className="solicitationDescription">
		     		{this.state.solicitacao.descricao}
		     		</p>

		     		<h4>Autor</h4>
		     		<p>{this.state.solicitacao.cidadao.nome}<button className="contactButton">Entrar em contato</button></p>

		     		<h4>Status</h4>
		     		<p>{(this.state.solicitacao.status == 0) ?("Pendente"):("")}</p>

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

		     		<div className="col-sm-12 marginTop10">
		     			<GettingStartedGoogleMap
						    containerElement={
						      <div style={{ height: `200px` }} />
						    }
						    mapElement={
						      <div style={{ height: `100%` }} />
						    }
						    
						  />
		     		</div>

	     		</div>
	      	</div>
	    );
  	}
};