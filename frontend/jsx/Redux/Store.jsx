import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from "./Reducers/index.jsx";

const middleware = applyMiddleware(promise(), thunk);

export default createStore(reducer, middleware); 