import React from "react";
import ReactDOM from "react-dom";

import Menu from "./Menu.jsx";
import TopMenu from "./TopMenu.jsx";
import NewSolicitationList from "./Widgets/NewSolicitationList.jsx";
import SolicitationNumbers from "./Widgets/SolicitationNumbers.jsx";
import ReceivedSolicitation from "./Widgets/ReceivedSolicitation.jsx";
import SolicitationSolved from "./Widgets/SolicitationSolved.jsx";
import SolicitationMap from "./Widgets/SolicitationMap.jsx";


import { connect } from "react-redux";

@connect((store) => {
	return {
		vereador: store.vereador
	};
})
export default class Dashboard extends React.Component{
	componentWillMount(){
	}
  	render() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-3"><NewSolicitationList/></div>
	     			<div className="col-sm-4">
	     				<div className="row">
	     					<SolicitationNumbers/>
	     				</div>
	     				<div className="row">

	     					<SolicitationSolved/>
	     				</div>
	     			</div>
	     			<div className="col-sm-4 marginLeft20">
	     				<div className="row">
	     					<ReceivedSolicitation/>
	     				</div>
	     				<div className="row">
	     					<SolicitationMap/>	
	     				</div>
	     			</div>
	     		</div>
	      	</div>
	    );
  	}
}