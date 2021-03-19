import {applyMiddleware, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import paisesReducer from "./reducers/paises";
const store = createStore(paisesReducer,composeWithDevTools(
    applyMiddleware(thunk)
))

export default store;