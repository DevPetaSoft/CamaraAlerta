export default function reducer(state={
	solicitacoes:null,
	solicitacaoSelecionada:null,
	fetching:false,
	fetched:false,
	error:null
},action){

	switch(action.type){
		case "FETCHING_SOLICITATION_START":{
			state.fetching = true;
			return state;
		}
		case "FETCHING_SOLICITATION_FINISH":{
			state.fetching = false;
			state.fetched = true;
			state.solicitacoes = action.payload;
			return state;
		}
		case "FETCHING_SOLICITATION_ONE_START":{
			state.fetching = true;
			return state;
		}
		case "FETCHING_SOLICITATION_ONE_FINISH":{
			state.fetching = false;
			state.fetched = true;
			state.solicitacaoSelecionada = action.payload;
			return state;
		}
		case "CHANGING_SOLICITATION_STATE":{
			state.solicitacaoSelecionada = action.payload;
			return state;
		}

	}

	return state;
}