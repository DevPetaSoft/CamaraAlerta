import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link, browserHistory} from 'react-router';



//Páginas do cidadão
import Login from "./Login.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Solicitations from "./Solicitations/Solicitations.jsx";


ReactDOM.render(
	(
		<Router history={browserHistory}>
		    <Route path="/" component={Login} />
		    <Route path="/dashboard" component={Dashboard} />
		    <Route path="/solicitations" component={Solicitations} />
		</Router>
		),
    document.getElementById('content')
);

module.exports = true;