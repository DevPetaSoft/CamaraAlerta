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