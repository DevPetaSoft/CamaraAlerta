import axios from "axios";

export function listagemSolicitacao(id){
	return function (dispatch){

		dispatch({type: "FETCHING_SOLICITATION_START"})
		axios.get(window.location.origin+"/vereador/"+id+"/listSolicitacoes")
			.then((response) => {

				dispatch({type: "FETCHING_SOLICITATION_FINISH", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function listagemNovaSolicitacao(id){
	return function (dispatch){

		dispatch({type: "FETCHING_SOLICITATION_START"})
		axios.get(window.location.origin+"/vereador/"+id+"/listNovasSolicitacoes")
			.then((response) => {

				dispatch({type: "FETCHING_SOLICITATION_FINISH", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function listagemUnicaSolicitacao(idSolicitacao, idVereador){
	return function (dispatch){

		dispatch({type: "FETCHING_SOLICITATION_ONE_START"})
		axios.get(window.location.origin+"/denuncia/"+idVereador+"/"+idSolicitacao)
			.then((response) => {

				dispatch({type: "FETCHING_SOLICITATION_ONE_FINISH", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function mudancaEstado(idSolicitacao, relatorio, status){
	return function (dispatch){
		var params = {
			id: idSolicitacao,
			relatorio: relatorio,
			status:status
		}
		axios.post(window.location.origin+"/denuncia/mudarEstado",params)
			.then((response) => {
				console.log(response);

				dispatch({type: "CHANGING_SOLICITATION_STATE", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}