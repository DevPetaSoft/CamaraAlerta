import axios from "axios";
import md5 from "md5";

export function vereadorLogin(email, senha){

	var params = {};
	params.email = email;
	if(senha == undefined){
		senha = "";
	}
	params.senha = md5("CAM-"+senha+"-RTA");
	return function (dispatch){
		axios.post(window.location.origin+"/vereador/login",params)
			.then((response) => {
				dispatch({type: "VEREADOR_LOGIN", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function listagemNovaSolicitacao(id){
	return function (dispatch){

		dispatch({type: "FETCHING_NUMBERS_START"})
		axios.get(window.location.origin+"/vereador/"+id+"/listNumerosMenu")
			.then((response) => {
				dispatch({type: "FETCHING_NUMBERS_FINISH", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}


export function listVereadorProfile(id){
	return function (dispatch){
		dispatch({type: "FETCHING_PROFILE_START"})
		axios.get(window.location.origin+"/vereador/"+id+"/profile")
			.then((response) => {
				dispatch({type: "FETCHING_PROFILE_FINISH", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function editProfile(id, telefone, cpf){
	return function (dispatch){
		var params = {
			id:id,
			telefone:telefone,
			cpf:cpf
		};
		axios.post(window.location.origin+"/vereador/editProfile", params)
			.then((response) => {
				dispatch({type: "EDIT_PROFILE", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function editConfiguration(id, solicitationNotification, messageNotification){
	return function (dispatch){
		var params = {
			id:id,
			solicitationNotification:solicitationNotification,
			messageNotification:messageNotification
		};
		axios.post(window.location.origin+"/vereador/editConfiguration", params)
			.then((response) => {
				console.log(response);
				dispatch({type: "EDIT_CONFIGURATION", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function listSolicitationNumbers(id){
	return function (dispatch){
		dispatch({type: "FETCHING_SOLICITATION_NUMBERS"})
		axios.get(window.location.origin+"/vereador/"+id+"/listSolicitationNumbers")
			.then((response) => {
				dispatch({type: "FETCHED_SOLICITATION_NUMBERS", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function listSolicitacoesPorMesList(id){
	return function (dispatch){
		dispatch({type: "FETCHING_GRAPH_NUMBERS"})
		axios.get(window.location.origin+"/vereador/"+id+"/listSolicitacoesPorMesList")
			.then((response) => {
				dispatch({type: "FETCHED_GRAPH_NUMBERS", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function gerarToken(email){
	return function (dispatch){
		var params = {
			email:email,
		};
		axios.post(window.location.origin+"/vereador/gerarToken",params)
			.then((response) => {
				dispatch({type: "GERAR_TOKEN", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function trocarSenha(email, token, password){
	return function (dispatch){
		var params = {
			email:email,
			token:token,
			password:password,
		};
		params.password = md5("CAM-"+password+"-RTA");
		axios.post(window.location.origin+"/user/trocarSenha",params)
			.then((response) => {
				dispatch({type: "TROCAR_SENHA", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}


export function criarVereador(vereador){

	var params = {};
	params.nome = vereador.nome;
	params.email = vereador.email;
	params.cpf = vereador.cpf;
	params.senha = md5("CAM-"+vereador.senha+"-RTA");
	params.cidade = {};
	params.cidade.id = vereador.cidade;
	params.criadoPor = {};
	params.criadoPor.email = localStorage.administradorEmail;

	return function (dispatch){
		axios.post(window.location.origin+"/vereador/save",params)
			.then((response) => {
				dispatch({type: "VEREADOR_NOVO", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}
