export default function reducer(state={
	canalComunicacao:null,
	canalComunicacaoSelecionado :null,
	listaDeCanais:null,
	listaDeMensagens:null,
	fetching:false,
	fetched:false,
	error:null
},action){

	switch(action.type){
		case "NEW_CANAL_COMUNICACAO":{
			state.canalComunicacao = action.payload;
			return state;
		}
		case "FETCHING_LIST_COMUNICACAO":{
			state.fetching = true;
			state.fetched = false;
			return state;
		}
		case "FETCHED_LIST_COMUNICACAO":{
			state.fetching = false;
			state.fetched = true;
			state.listaDeCanais = action.payload;
			return state;
		}
		case "FETCHING_LIST_MENSAGEM":{
			state.fetching = true;
			state.fetched = false;
			return state;
		}
		case "FETCHED_LIST_MENSAGEM":{
			state.fetching = false;
			state.fetched = true;
			state.canalComunicacaoSelecionado = action.payload.canal;
			state.listaDeMensagens = action.payload.list;
			return state;
		}
		case "NEW_MESSAGE":{
			state.fetching = false;
			state.fetched = true;
			state.canalComunicacaoSelecionado = action.payload.canal;
			state.listaDeMensagens = action.payload.list;
			return state;
		}
	}

	return state;
}