import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import { mudancaEstado } from "./../Redux/Actions/SolicitacaoActions.jsx";

import { connect } from "react-redux";

import store from "./../Redux/Store.jsx";

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const pos = { lat:-21.232756, lng: -44.995004 };
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    defaultCenter={{ lat:-21.232756, lng: -44.995004 }}
    onClick={props.onMapClick}
  >
  <Marker position={props.pos} />

  </GoogleMap>
));

const modalStyle = {
	content : {
    left                  : '25%',
    right                 : '25%'
  }
}



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

	getStatus(status){
		if(status === 0){
			return "Pendente";
		}else if(status === 1){
			return "Em andamento";
		}else if(status === 2){
			return "Finalizada com sucesso";
		}else if(status === 3){
			return "Recusado";
		}


	}

	enviarRelatorio(){

		var relatorio = this.refs.relatorio.value;
		var status = this.refs.status.value;
		var id = this.state.solicitacao.id;

		this.props.dispatch(mudancaEstado(id,relatorio, status));
	}

	openModal(){
		this.setState({
			modalOpen:true
		});
	}

	closeModal(){
		this.setState({
			modalOpen:false
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

	     	<Modal
			  isOpen={this.state.modalOpen}
			  contentLabel="Resposta da solicitação"
			  style={modalStyle}
			>
			  <h4 className="solicitationModalTitle	">Resposta da solicitação</h4>
			  <p>Relatório:</p>
			  <textarea className="solicitationModalTextArea"ref="relatorio" />
			  <p>Status: </p>
			  <select ref="status">
			  	<option value="0">Pendente</option>
			  	<option value="1">Em andamento</option>
			  	<option value="2">Finalizado com sucesso</option>
			  	<option value="3">Recusado</option>
			  </select>
			  <br/>
			  <div className="solicitationModalButtons">
				  <button onClick={this.closeModal.bind(this)}>Fechar</button>
				  <button className="solicitationModalSendButton" onClick={this.enviarRelatorio.bind(this)}>Enviar</button>
			  </div>
			</Modal>

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
		     		<p>{this.getStatus(this.state.solicitacao.status)}</p>

		     		<button className="col-sm-offset-3 col-sm-6" onClick={this.openModal.bind(this)}>Responder</button>

	     		</div>


	     		<div className="col-sm-6">

		     		<div className="col-sm-12">
		     			<img className="solicitationImage" 
		     			src={this.state.solicitacao.fotosServidor[0]}/>
		     		</div>

		     		<div className="col-sm-4">
		     			{(this.state.solicitacao.fotosServidor.length >= 2)?(
		     			<img className="solicitationImageSecundary" 
			     		src={this.state.solicitacao.fotosServidor[1]}  />):("")}
		     		</div>

		     		<div className="col-sm-4">
		     		{(this.state.solicitacao.fotosServidor.length >= 3)?(
		     			<img className="solicitationImageSecundary" 
			     		src={this.state.solicitacao.fotosServidor[2]}  />):("")}
			     		
		     		</div>

		     		<div className="col-sm-4">
			     		{(this.state.solicitacao.fotosServidor.length >= 4)?(
		     			<img className="solicitationImageSecundary" 
			     		src={this.state.solicitacao.fotosServidor[3]}  />):("")}
		     		</div>

		     		<div className="col-sm-12 marginTop10">
		     			<GettingStartedGoogleMap
						    containerElement={
						      <div style={{ height: `200px` }} />
						    }
						    mapElement={
						      <div style={{ height: `100%` }} />
						    }
						    pos={(this.state)?({ lat:this.state.solicitacao.coordenadas.latitude, lng: this.state.solicitacao.coordenadas.longitude }):("")}
						  />
		     		</div>

	     		</div>
	      	</div>
	    );
  	}
};