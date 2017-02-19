import { combineReducers } from "redux";

//Import reducers
import vereador from "./VereadorReducer.jsx";
import solicitacao from "./SolicitacaoReducer.jsx";
import canalComunicacao from "./CanalDeComunicacaoReducer.jsx";
import administrador from "./AdministradorReducer.jsx";
import estado from "./EstadoReducer.jsx";
import cidade from "./CidadeReducer.jsx";
import toastr from "./ToastrReducer.jsx";

export default combineReducers({
	administrador,
	vereador,
	cidade,
	estado,
	solicitacao,
	canalComunicacao,
	toastr
});