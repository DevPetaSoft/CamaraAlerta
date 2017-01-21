import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link, browserHistory} from 'react-router';

// Toastr
import Toastr from "./Toastr.jsx";

// Redux
import { Provider } from "react-redux";

// Store do redux

import store from "./Redux/Store.jsx";

//Páginas do vereador
import Login from "./Login.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Solicitations from "./Solicitations/Solicitations.jsx";
import Messages from "./Messages/Messages.jsx";
import MapsBoard from "./Maps/MapsBoard.jsx";
import EditProfile from "./Profile/EditProfile.jsx";
import Configuration from "./Configuration/ConfigurationBoard.jsx";


ReactDOM.render(
	(
		<Provider store={ store } >
			<div>
				<Toastr/>
				<Router history={browserHistory}>
				    <Route path="/" component={Login} />
				    <Route path="/dashboard" component={Dashboard} />
				    <Route path="/solicitations" component={Solicitations} />
				    <Route path="/messages" component={Messages}/>
				    <Route path="/maps" component={MapsBoard}/>
				    <Route path="/editProfile" component={EditProfile}/>
				    <Route path="/configuration" component={Configuration}/>
				</Router>
			</div>
		</Provider>
		),
    document.getElementById('content')
);

module.exports = true;