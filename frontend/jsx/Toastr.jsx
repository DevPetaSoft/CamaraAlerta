import React from "react";
import ReactDOM from "react-dom";

var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

import { connect } from "react-redux";

import { clearMessage } from "./Redux/Actions/ToastrActions.jsx";

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

			// Verifica se a store Toastr recebeu uma mensagem de sucesso
			if(state.toastr.success){
				this.refs.toastr.success(
			      state.toastr.message,
			      "", {
			      timeOut: 30000,
			      extendedTimeOut: 10000
			    });
			    this.props.dispatch(clearMessage());
			}else if(state.toastr.error){
				// Verifica se a store Toastr recebeu uma mensagem de erro
				this.refs.container.error(
			      state.toastr.message,
			      "", {
			      timeOut: 30000,
			      extendedTimeOut: 10000
			    });

			    this.props.dispatch(clearMessage());
			}

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