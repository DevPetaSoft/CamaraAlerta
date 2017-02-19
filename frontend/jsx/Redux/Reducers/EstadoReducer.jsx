export default function reducer(state={
	estado:null,
	estados:[],
	fetching:false,
	fetched:false,
	error:null
},action){

	switch(action.type){
		case "ESTADO_NOVO":{
			state.estado = action.payload;
			return state;
		}
		case "ESTADO_LISTAR_TODOS":{
			state.estados = action.payload;
			return state;
		}
	}

	return state;
}