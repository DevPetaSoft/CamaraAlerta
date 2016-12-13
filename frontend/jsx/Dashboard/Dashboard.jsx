import React from "react";
import ReactDOM from "react-dom";

import Menu from "./Menu.jsx";
import TopMenu from "./TopMenu.jsx";
import SolicitationList from "./Widgets/SolicitationList.jsx";
import SolicitationNumbers from "./Widgets/SolicitationNumbers.jsx";
import ReceivedSolicitation from "./Widgets/ReceivedSolicitation.jsx";
import SolicitationSolved from "./Widgets/SolicitationSolved.jsx";
import SolicitationMap from "./Widgets/SolicitationMap.jsx";

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu/>

	     		<div className="dashboardContainder">
	     			<div className="col-sm-3"><SolicitationList/></div>
	     			<div className="col-sm-4">
	     				<div className="row">
	     					<SolicitationNumbers/>
	     				</div>
	     				<div className="row">

	     					<SolicitationSolved/>
	     				</div>
	     			</div>
	     			<div className="col-offset-1 col-sm-4">
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
});