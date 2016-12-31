import axios from "axios";

export function listagemSolicitacao(id){
	return function (dispatch){

		dispatch({type: "FETCHING_SOLICITATION_START"})
		axios.get("http://localhost:9000/vereador/"+id+"/listSolicitacoes")
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
		axios.get("http://localhost:9000/vereador/"+id+"/listNovasSolicitacoes")
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
		axios.get("http://localhost:9000/denuncia/"+idVereador+"/"+idSolicitacao)
			.then((response) => {

				dispatch({type: "FETCHING_SOLICITATION_ONE_FINISH", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}