export default function reducer(state={
	success:false,
	error:false,
	message: ""
},action){

	switch(action.type){
		case "CREATE_SUCCESS_MESSAGE":{
			state.message = action.payload;
			state.success = true;
			return state;
		}
		case "CREATE_ERROR_MESSAGE":{
			state.message = action.payload;
			state.error = true;
			return state;
		}
		case "CLEAR_MESSAGE":{
			state.message = "";
			state.error = false;
			state.success = false;
			return state;
		}
	}

	return state;
}