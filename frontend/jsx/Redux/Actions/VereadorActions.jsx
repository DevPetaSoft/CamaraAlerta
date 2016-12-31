import axios from "axios";
import md5 from "md5";

export function vereadorLogin(email, senha){

	var params = {};
	params.email = email;
	params.senha = md5(senha);
	return function (dispatch){
		axios.post("http://localhost:9000/vereador/login",params)
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
		axios.get("http://localhost:9000/vereador/"+id+"/listNumerosMenu")
			.then((response) => {
				dispatch({type: "FETCHING_NUMBERS_FINISH", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}