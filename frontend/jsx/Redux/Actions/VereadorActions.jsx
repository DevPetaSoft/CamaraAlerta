import axios from "axios";
import md5 from "md5";

export function vereadorLogin(email, senha){

	var params = {};
	params.email = email;
	params.senha = md5(senha);
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

export function editProfile(id, nome, telefone, cpf){
	return function (dispatch){
		var params = {
			id:id,
			nome:nome,
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