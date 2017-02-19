import axios from "axios";
import md5 from "md5";

export function administradorLogin(email, senha){

	var params = {};
	params.email = email;
	if(senha == undefined){
		senha = "";
	}
	params.senha = md5("CAM-"+senha+"-RTA");
	return function (dispatch){
		axios.post(window.location.origin+"/administrador/login",params)
			.then((response) => {
				dispatch({type: "ADMINISTRADOR_LOGIN", payload:response.data})
			})
			.catch((err) => {
				console.log(err);
			})
	}
}
