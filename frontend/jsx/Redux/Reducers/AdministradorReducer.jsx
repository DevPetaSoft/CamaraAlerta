export default function reducer(state={
	administrador:null,
	fetching:false,
	fetched:false,
	error:null
},action){

	switch(action.type){
		case "ADMINISTRADOR_LOGIN":{
			state.administrador = action.payload;
			return state;
		}
	}

	return state;
}