import React from "react";
import ReactDOM from "react-dom";


import { listagemSolicitacao, listagemUnicaSolicitacao } from "./../Redux/Actions/SolicitacaoActions.jsx";

import { connect } from "react-redux";

import store from "./../Redux/Store.jsx";

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -23, lng: -45 }}
    onClick={props.onMapClick}
  >
  {props.markers.map((marker,idx) => (
  	<Marker key={idx} position={{lat:marker.coordenadas.latitude, lng:marker.coordenadas.longitude}} />
  	))}
  </GoogleMap>
));


@connect((store) => {
	return {
		solicitacoes: store.solicitacao
	};
})
export default class MapsList extends React.Component{
	componentWillMount(){

		store.subscribe(()=>{
			this.setState({
				solicitacoes:store.getState().solicitacao.solicitacoes
			});	
		});

		this.props.dispatch(listagemSolicitacao(localStorage.vereadorId));

	}
  	render() {
  		if(!this.state){
  			return(<div className="mapsBackground"></div>);
  		}
  		if(!this.state.solicitacoes){
  			return(<div className="mapsBackground"></div>);
  		}

  		console.log(this.state.solicitacoes);
	    return (
	     	<div className="mapsBackground">
	     		<GettingStartedGoogleMap
			    containerElement={
			      <div style={{ height: `100%` }} />
			    }
			    mapElement={
			      <div style={{ height: `100%` }} />
			    }
			    markers={this.state.solicitacoes}
			  />
	      	</div>
	    );
  	}
}

