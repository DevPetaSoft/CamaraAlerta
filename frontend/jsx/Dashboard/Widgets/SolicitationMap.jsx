import React from "react";
import ReactDOM from "react-dom";



import { withGoogleMap, GoogleMap } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -23, lng: -45 }}
    onClick={props.onMapClick}
  >
  </GoogleMap>
));


export default React.createClass({
	getInitialState(){
		return{
		
		}
	},
  	render: function() {
	    return (
	     	<div className="dashboardWidget">
	     		<h4 className="paddingBottom0 dashboardWidgetTitle">Mapa de solicitações</h4>
	     		
					<GettingStartedGoogleMap
				    containerElement={
				      <div style={{ height: `80%` }} />
				    }
				    mapElement={
				      <div style={{ height: `100%` }} />
				    }
				    
				  />
	      	</div>
	    );
  	}
});