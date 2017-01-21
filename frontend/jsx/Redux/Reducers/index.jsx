import { combineReducers } from "redux";

//Import reducers
import vereador from "./VereadorReducer.jsx";
import solicitacao from "./SolicitacaoReducer.jsx";
import canalComunicacao from "./CanalDeComunicacaoReducer.jsx";
import toastr from "./ToastrReducer.jsx";

export default combineReducers({
	vereador,
	solicitacao,
	canalComunicacao,
	toastr
});