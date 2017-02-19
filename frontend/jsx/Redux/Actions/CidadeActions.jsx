import axios from "axios";

export function criarCidade(cidade){

	var params = {};
	params.nome = cidade.nome;
	params.estado ={};
	params.estado.id = cidade.estado;

	return function (dispatch){
		axios.post(window.location.origin+"/cidade/save",params)
			.then((response) => {
				dispatch({type: "CIDADE_NOVO", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

export function listarTodos(){
	return function(dispatch){
		axios.get(window.location.origin+"/cidade/list")
		.then((response)=>{
			dispatch({type:"CIDADE_LISTAR_TODOS", payload:response.data});
		})
		.catch((err) =>{
			console.log(err);
		})
	}
}