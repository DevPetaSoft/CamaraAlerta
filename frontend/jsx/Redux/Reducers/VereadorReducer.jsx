export default function reducer(state={
	vereador:null,
	fetching:false,
	fetched:false,
	numeroDeNovasSolicitacoes: 0,
	numeroDeNovasMensagens: 0,
	error:null
},action){

	switch(action.type){
		case "VEREADOR_LOGIN":{
			state.vereador = action.payload;
			return state;
		}
		case "FETCHING_NUMBERS_START":{
			state.fetching = true;
			state.fetched = false;
			return state;
		}
		case "FETCHING_NUMBERS_FINISH":{
			state.fetching = false;
			state.fetched = true;
			state.numeroDeNovasSolicitacoes = action.payload.numerosDeSolicitacoesNovas;
			state.numeroDeNovasMensagens = action.payload.numerosDeMensagensNovas;
			return state;
		}
		case "FETCHING_PROFILE_START":{
			state.fetching = true;
			state.fetched = false;
			return state;
		}
		case "FETCHING_PROFILE_FINISH":{
			state.fetching = false;
			state.fetched = true;
			state.vereador = action.payload;
			return state;
		}
		case "EDIT_PROFILE":{
			state.vereador = action.payload;
			return state;
		}
		case "EDIT_CONFIGURATION":{
			state.vereador = action.payload;
			return state;
		}
		case "FETCHING_SOLICITATION_NUMBERS":{	
			state.fetching = true;
			state.fetched = false;
			return state;
		}
		case "FETCHED_SOLICITATION_NUMBERS":{
			state.fetching = false;
			state.fetched = true;
			state.numbers = action.payload;
			return state;
		}
		case "FETCHING_GRAPH_NUMBERS":{	
			state.fetching = true;
			state.fetched = false;
			return state;
		}
		case "FETCHED_GRAPH_NUMBERS":{
			state.fetching = false;
			state.fetched = true;
			state.graphNumbers = action.payload;
			return state;
		}
	}

	return state;
}