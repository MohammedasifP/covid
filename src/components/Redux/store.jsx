// import { reducer } from "./reducer";
import { createStore } from "redux";

import { loginreducer } from "./Login/Loginreducer";


export const store=createStore(loginreducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


