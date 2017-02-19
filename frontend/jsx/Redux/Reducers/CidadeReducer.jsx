export default function reducer(state={
	cidade:null,
	cidades:[],
	fetching:false,
	fetched:false,
	error:null
},action){

	switch(action.type){
		case "CIDADE_NOVO":{
			state.cidade = action.payload;
			return state;
		}
		case "CIDADE_LISTAR_TODOS":{
			state.cidades = action.payload;
			return state;
		}
	}

	return state;
}