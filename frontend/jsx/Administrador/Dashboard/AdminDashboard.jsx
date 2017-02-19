import React from "react";
import ReactDOM from "react-dom";

import TopMenu from "./TopMenu.jsx";
import Menu from "./Menu.jsx";


import { connect } from "react-redux";

@connect((store) => {
	return {
		administrador: store.administrador
	};
})
export default class Dashboard extends React.Component{
	componentWillMount(){
	}
  	render() {
	    return (
	     	<div className="dashboardBody">
	     		<TopMenu />
	     		<Menu />

	     		
	      	</div>
	    );
  	}
}