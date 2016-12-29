export default function reducer(state={
	vereador:null,
	fetching:false,
	fetched:false,
	error:null
},action){

	switch(action.type){
		case "VEREADOR_LOGIN":{
			state.vereador = action.payload;
			return state;
		}
	}

	return state;
}