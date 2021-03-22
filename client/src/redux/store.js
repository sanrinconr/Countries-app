import {applyMiddleware, combineReducers, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import paisesReducer from "./reducers/paises";
import detallePaisReducer from "./reducers/detallePais"
const rootReducer = combineReducers({
    paisesReducer,
    detallePaisReducer
})
const store = createStore(rootReducer,composeWithDevTools(
    applyMiddleware(thunk)
))

export default store;