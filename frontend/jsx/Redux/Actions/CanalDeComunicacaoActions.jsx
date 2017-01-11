import axios from "axios";

export function novoCanal(solicitacaoId, vereadorId, mensagem){
	return function (dispatch){
		var params = {
			solicitacaoId : solicitacaoId,
			vereadorId : vereadorId,
			mensagem : mensagem
		};
		axios.post(window.location.origin+"/canalComunicacao/entrarEmContato",params)
			.then((response) => {
				dispatch({type: "NEW_CANAL_COMUNICACAO", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function listarCanais(vereadorId){
	return function (dispatch){
		dispatch({type:"FETCHING_LIST_COMUNICACAO"});
		axios.get(window.location.origin+"/canalComunicacao/vereador/"+vereadorId)
			.then((response) => {
				dispatch({type: "FETCHED_LIST_COMUNICACAO", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function listarMensagens(canalId){
	return function (dispatch){
		dispatch({type:"FETCHING_LIST_MENSAGEM"});
		axios.get(window.location.origin+"/canalComunicacao/mensagem/"+canalId)
			.then((response) => {
				dispatch({type: "FETCHED_LIST_MENSAGEM", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}


export function novaMensagem(canalId, mensagem){
	return function (dispatch){
		var params = {
			canalId : canalId,
			mensagem : mensagem
		};
		axios.post(window.location.origin+"/canalComunicacao/novaMensagem",params)
			.then((response) => {
				dispatch({type: "NEW_MESSAGE", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}