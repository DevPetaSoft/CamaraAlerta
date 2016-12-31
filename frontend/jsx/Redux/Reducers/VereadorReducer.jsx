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
	}

	return state;
}