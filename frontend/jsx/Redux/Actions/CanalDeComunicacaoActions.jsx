import axios from "axios";

export function novoCanal(solicitacaoId, vereadorId, mensagem){
	return function (dispatch){
		var params = {
			solicitacaoId : solicitacaoId,
			vereadorId : vereadorId,
			mensagem : mensagem
		};
		axios.post("http://localhost:9000/canalComunicacao/entrarEmContato",params)
			.then((response) => {
				dispatch({type: "NEW_CANAL_COMUNICACAO", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}