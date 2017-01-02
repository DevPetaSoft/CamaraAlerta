export default function reducer(state={
	canalComunicacao:null,
	fetching:false,
	fetched:false,
	error:null
},action){

	switch(action.type){
		case "NEW_CANAL_COMUNICACAO":{
			state.canalComunicacao = action.payload;
			return state;
		}

	}

	return state;
}