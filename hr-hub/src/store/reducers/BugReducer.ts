import {    PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StoreNames } from '../config';

const initialState : BugState =  {
    bugs:[
        {
            title:"Test",
            details:"this is a test bug",
            id:"abc",
            sno:"1",
            status:"solve"
        }
    ]
}
const bugSlice = createSlice({
    initialState,
    name:StoreNames.BUG,
    reducers:{
        setBugs : (state,action:PayloadAction<Bug[]>)=>{
            state.bugs = action.payload;
        }
    }
})

export const {
    setBugs
} = bugSlice.actions;

export default bugSlice.reducer;