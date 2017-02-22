import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import ReportHistory from "./ReportHistory.jsx";

import Button from 'muicss/lib/react/button';

import { mudancaEstado, listHistoricosSolicitacao } from "./../Redux/Actions/SolicitacaoActions.jsx";
import { novoCanal } from "./../Redux/Actions/CanalDeComunicacaoActions.jsx";
import { successMessage } from "./../Redux/Actions/ToastrActions.jsx";

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
			var historicos = store.getState().solicitacao.historicos;
			var solicitacao = store.getState().solicitacao.solicitacaoSelecionada;
			this.setState({
				solicitacao: solicitacao,
				historicos: historicos
			
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
			return "Não resolvida(ou recusada)";
		}


	}


	enviarRelatorio(){

		var relatorio = this.refs.relatorio.value;
		var status = this.refs.status.value;
		var id = this.state.solicitacao.id;

		this.props.dispatch(mudancaEstado(id,relatorio, status));

		this.props.dispatch(successMessage("Relatório enviado com sucesso!"));
		this.closeModal();
	}

	criarCanalComunicacao(){
		var mensagem = this.refs.mensagem.value;
		var vereadorId = localStorage.vereadorId;
		var id = this.state.solicitacao.id;

		this.props.dispatch(novoCanal(id,vereadorId,mensagem));

		this.setState({
			modalMessageOpen:false
		});
	}

	openModal(){
		//Busca os historicos pela solicitacao
		this.props.dispatch(listHistoricosSolicitacao(this.state.solicitacao.id));
		this.setState({
			modalOpen:true
		});
	}

	closeModal(){
		this.setState({
			modalOpen:false
		});
	}

	openModalMessage(){
		this.setState({
			modalMessageOpen:true
		});
	}

	closeModalMessage(){
		this.setState({
			modalMessageOpen:false
		});
	}
  	render() {
  		if(!this.state){
  			return(
	     	<div className="solicitationBackground">
	     		<h4 className="emptySolicitationLabel">Nenhuma solicitação selecionada</h4>
	     	</div>)
  		}
  		if(!this.state.solicitacao){
  			return(
	     	<div className="solicitationBackground">
	     		<h4 className="emptySolicitationLabel">Nenhuma solicitação selecionada</h4>
	     	</div>)
  		}

	    return (
	     	<div className="solicitationBackground">

	     	{/* Modal de Relatório de solicitação*/}
	     	<Modal
			    isOpen={this.state.modalOpen}
			    contentLabel="Relatório da solicitação"
   			    style={modalStyle}
				shouldCloseOnOverlayClick={false}
			>
			  <h4 className="solicitationModalTitle	">Relatório da solicitação</h4>
			  <p>Relatório:</p>
			  <textarea className="solicitationModalTextArea"ref="relatorio" defaultValue={(this.state.solicitacao)?(this.state.solicitacao.relatorio):("") } />
			  <p>Status: </p>
			  <select ref="status" defaultValue={(this.state.solicitacao)?(this.state.solicitacao.status):("")}>
			  	<option value="0">Pendente</option>
			  	<option value="1">Em andamento</option>
			  	<option value="2">Finalizado com sucesso</option>
			  	<option value="3">Não resolvida(ou recusada)</option>
			  </select>

			  <h5>Histórico de relatórios</h5>
			  <div className="solicitationReportHistory">
			  		{this.state.historicos.map((historico,idx)=>{
		     			return(<ReportHistory key={idx} historico={historico} />);
		     		})}
				  
			  </div>
			  <br/>

			  <div className="solicitationModalButtons">

				    <Button variant="raised" onClick={this.closeModal.bind(this)}>Fechar</Button>
	          		<Button className="solicitationModalSendButton" onClick={this.enviarRelatorio.bind(this)} variant="raised" color="primary">Enviar</Button>
				  
			  </div>
			</Modal>

		{/* Modal de abertura de canal de conversa */}
		<Modal
			isOpen={this.state.modalMessageOpen}
			contentLabel="Mandar mensagem para solicitante"
			style={modalStyle}
			shouldCloseOnOverlayClick={false}
		>
			<h4 className="solicitationModalTitle">Mandar mensagem para solicitante</h4>
			<p>Mensagem:</p>
			<textarea className="solicitationModalTextArea" ref="mensagem" />
			<div className="solicitationModalButtons">
				    <Button variant="raised" onClick={this.closeModalMessage.bind(this)}>Fechar</Button>
	          		<Button className="solicitationModalSendButton" onClick={this.criarCanalComunicacao.bind(this)} variant="raised" color="primary">Enviar</Button>	  
			 </div>
		</Modal>

	     		<div className="col-sm-6">

		     		<h4 className="cursorDefault">Assunto</h4>
		     		<p className="cursorDefault">{this.state.solicitacao.titulo}</p>

		     		<h4 className="cursorDefault">Descrição</h4>
		     		<p className="solicitationDescription cursorDefault">
		     		{this.state.solicitacao.descricao}
		     		</p>

		     		<div className="autorStatusDetails">
			     		<h4 className="cursorDefault">Autor</h4>
			     		<p className="cursorDefault">{this.state.solicitacao.cidadao.nome}
			     			
	 					</p>

		          		
					  

			     		<h4 className="cursorDefault">Status</h4>
			     		<p className="cursorDefault">{this.getStatus(this.state.solicitacao.status)}</p>
						
						
		     		</div>
		     		<div className="solicitationDetailsButton">
			     		<Button className="" 
				     					onClick={this.openModal.bind(this)} 
				     					variant="raised" 
				     					color="primary">Enviar relatório</Button>
			     		<Button className="solicitationModalSendButton contactButton" 
				     					onClick={this.openModalMessage.bind(this)} 
				     					variant="raised" 
				     					color="primary">Bate-papo</Button>
			     	</div>
	     		</div>


	     		<div className="col-sm-6">
	     			<div className="solicitacaoImagens">
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