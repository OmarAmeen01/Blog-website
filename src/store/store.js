import { combineReducers, configureStore} from "@reduxjs/toolkit"
import StateReducer from "./authSlice"



 const store = configureStore({
   reducer:StateReducer
})
export default store