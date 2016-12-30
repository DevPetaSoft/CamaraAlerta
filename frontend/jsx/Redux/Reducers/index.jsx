import { combineReducers } from "redux";

//Import reducers
import vereador from "./VereadorReducer.jsx";
import solicitacao from "./SolicitacaoReducer.jsx";

export default combineReducers({
	vereador,
	solicitacao
});