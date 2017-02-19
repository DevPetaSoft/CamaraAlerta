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

import VereadorForgetPassword from "./Password/VereadorForgetPassword.jsx";
import ChangePassword from "./Password/ChangePassword.jsx";

//Páginas do administrador
import AdminLogin from "./Administrador/Index.jsx";
import AdminDashboard from "./Administrador/Dashboard/AdminDashboard.jsx";
import AdminCadastrarEstado from "./Administrador/Estado/CadastroEstado.jsx";
import AdminCadastrarCidade from "./Administrador/Cidades/CadastroCidade.jsx";
import AdminCadastrarVereador from "./Administrador/Vereador/CadastroVereador.jsx";


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

				    <Route path="/forgetPassword" component={VereadorForgetPassword}/>
				    <Route path="/changePassword" component={ChangePassword}/>

				    <Route path="/AdminLogin" component={AdminLogin}/>
				    <Route path="/AdminDashboard" component={AdminDashboard} />
				    <Route path="/AdminCadastrarEstado" component={AdminCadastrarEstado} />
				    <Route path="/AdminCadastrarCidade" component={AdminCadastrarCidade} />
				    <Route path="/AdminCadastrarVereador" component={AdminCadastrarVereador} />
				</Router>
			</div>
		</Provider>
		),
    document.getElementById('content')
);

module.exports = true;