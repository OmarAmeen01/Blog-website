import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status:false,
    userData: "djfld",
    postData:[]
}

const stateSlice=createSlice({
    name:"state",
    initialState,
    reducers:{
login:(state,action)=>{
    state.status=true,
    state.userData= action.payload.userData

},
logout:(state)=>{
 state.status= false,
 state.userData= null
}

} 
})
export default stateSlice.reducer
export const {login,logout} = stateSlice.actions