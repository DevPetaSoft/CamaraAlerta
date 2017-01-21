export function successMessage(message){
	return function(dispatch){

		dispatch({type: "CREATE_SUCCESS_MESSAGE", payload:message});
	}
}

export function errorMessage(message){

	return function(dispatch){

		dispatch({type: "CREATE_ERROR_MESSAGE", payload:message});
	}
}


export function clearMessage(){

	return function(dispatch){
		dispatch({type: "CLEAR_MESSAGE"});
	}

}

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