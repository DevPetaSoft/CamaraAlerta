import React from "react";
import ReactDOM from "react-dom";

export default React.createClass({
	getDefaultProps(){
		return{
			yoursefl:true
		}

	},

  	render: function() {
	    return (
	     	<div className={(this.props.yoursefl)?("messageItemChatBackgroundYourself"):("messageItemChatBackgroundClient")}>
	     		<p>{this.props.mensagem.mensagem}</p>
	      	</div>
	    );
  	}
});