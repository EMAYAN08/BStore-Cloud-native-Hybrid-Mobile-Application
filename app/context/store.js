import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import myReducer from "./reducers";

const store = createStore(myReducer, applyMiddleware(thunk));

export default store;
