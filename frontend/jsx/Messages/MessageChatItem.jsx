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
	     		<p>
	     			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt efficitur pellentesque. 
		     		Ut eu orci id sapien viverra elementum. Morbi tristique nisi vel tellus cursus, sit amet interdum ligula
		     		suscipit. Donec elit turpis, condimentum a lacus ut, laoreet imperdiet ex. Duis vitae dolor tempus, finibus
		     		tellus a, sollicitudin augue. Nullam in ullamcorper velit, et accumsan turpis. Nunc suscipit imperdiet sagittis. 
		     		Etiam quis felis est. Aenean ut velit elit. Ut aliquam lectus non libero vulputate, a facilisis nisl mattis. Nunc id 
		     		neque sed mi ultricies scelerisque. Phasellus consectetur tortor a mauris malesuada, at ultrices neque ullamcorper.
	     		</p>
	      	</div>
	    );
  	}
});