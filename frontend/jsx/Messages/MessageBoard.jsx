import React from "react";
import ReactDOM from "react-dom";

import Menu from "./../Dashboard/Menu.jsx";
import TopMenu from "./../Dashboard/TopMenu.jsx";

import MessageChatItem from "./MessageChatItem.jsx";

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';


export default React.createClass({


  	render: function() {
	    return (
	     	<div className="messageBoardBackground">
	     		<h4>Titulo da solicitação</h4>
	     		<div className="messageBoardBackgroundContainer">

		     		<div className="messageInputBlock">
		     			<div className="messagesBlock">
			     			<MessageChatItem yoursefl={false}/>
			     			<MessageChatItem yoursefl={true}/>
			     			<MessageChatItem yoursefl={false}/>
			     			<MessageChatItem yoursefl={true}/>
		     			</div>
		     			
			     		<Input hint="Digite sua mensagem aqui..." className="messageInput col-md-10"/>
			     		<button className="messageButton col-md-2"><img src="public/icons/send.svg" /></button>
		     		</div>

	     		</div>

	      	</div>
	    );
  	}
});