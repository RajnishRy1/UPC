
import {createSlice} from '@reduxjs/toolkit';

const initialState={
    file:null,
    fileName:''
}

const fileSlice = createSlice({
    name:'File',
    initialState:initialState,
    reducers:{
        reset:()=>initialState,
        fileChange(state,action){
            state.file=action.payload.file;
        },
        filenameChange(state,action){
            state.fileName = action.payload.fileName;
        }
    }
})

export const fileActions = fileSlice.actions; 
export default fileSlice;