import React from "react";
import ReactDOM from "react-dom";
import {Chart} from 'react-google-charts';

import { verificarMes } from "../../Utils/DateUtils.jsx";

import { listSolicitacoesPorMesList } from "./../../Redux/Actions/VereadorActions.jsx";

import { connect } from "react-redux";

import store from "./../../Redux/Store.jsx";



@connect((store) => {
	return {
		numerosDosGraficos: store.solicitacao.graphNumbers
	};
})
export default class SolicitationSolved extends React.Component{

	componentWillMount(){

		store.subscribe(()=>{
			this.setState({
				graphNumbers:store.getState().vereador.graphNumbers
			});	
			if(store.getState().vereador.graphNumbers){
				this.formatarNumerosParaGrafico(store.getState().vereador.graphNumbers);
			}
		});

		this.props.dispatch(listSolicitacoesPorMesList(localStorage.vereadorId));

	}

	formatarNumerosParaGrafico(numbers){
		var vetor = [['Mês', 'Solicitações']];
		if(numbers.length>0)
		{
			for(var i =0;i<numbers.length;i++){
				var item = [verificarMes(numbers[i].mes), numbers[i].numeroDeSolicitacoesResolvidas];
				vetor.push(item);	
			}
		}else{
			vetor.push(['',0]);
		}
		
		this.setState({
			items:vetor
		});
	}
    


  	render() {
  		if(!this.state){
  			return (<div></div>);
  		}
  		if(!this.state.graphNumbers){
  			return(<div></div>);
  		}  		
  		if(!this.state.items){
  			return(<div></div>);
  		}
	    return (
	     	<div className="dashboardWidget">
	     		<h4 className="dashboardWidgetTitle">Solicitações resolvidas</h4>
				<Chart
			        chartType="ColumnChart" 
			        data={this.state.items}
			        options={{
			        	legend:'bottom'
			        }}
			        graph_id="LineChart2"
			        width="100%"
			        height="150px"
			        legend_toggle
		       />
	      	</div>
	    );
  	}
}