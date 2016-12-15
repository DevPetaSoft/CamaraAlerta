import React from "react";
import ReactDOM from "react-dom";
import {Chart} from 'react-google-charts';

export default React.createClass({
  	render: function() {
	    return (
	     	<div className="dashboardWidget">
	     		<h4 className="dashboardWidgetTitle">Solicitações recebidas</h4>

	     		<Chart
			        chartType="LineChart" 
			        data={[['Age', 'Weight'], [8, 12], [4, 5.5]]}
			        options={{}}
			        graph_id="LineChart1"
			        width="100%"
			        height="150px"
			        legend_toggle
		       />
	      	</div>
	    );
  	}
});