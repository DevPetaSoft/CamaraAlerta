import React from "react";
import ReactDOM from "react-dom";

var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

import { connect } from "react-redux";

import store from "./Redux/Store.jsx";




@connect((store) => {
	return {
		toastr: store.toastr
	};
})
export default class Toastr extends React.Component {

	componentDidMount(){
		
		store.subscribe(()=>{
			var state = store.getState();

		});
	}

  	render() {
	    return (
	     	<ToastContainer ref="toastr"
	                        toastMessageFactory={ToastMessageFactory}
	                        className="toast-top-right" />
	    );
  	}
}