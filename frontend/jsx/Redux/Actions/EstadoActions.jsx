import axios from "axios";

export function criarEstado(nome){

	var params = {};
	params.nome = nome;

	return function (dispatch){
		axios.post(window.location.origin+"/estado/save",params)
			.then((response) => {
				dispatch({type: "ESTADO_NOVO", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function listarTodos(){
	return function(dispatch){
		axios.get(window.location.origin+"/estado/list")
		.then((response)=>{
			dispatch({type:"ESTADO_LISTAR_TODOS", payload:response.data});
		})
		.catch((err) =>{
			console.log(err);
		})
	}
}