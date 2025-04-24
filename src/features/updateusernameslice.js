import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUsername=createAsyncThunk(
    'updateuser/updatename',
    async (username, { getState, rejectWithValue }) => {
        try{
            const token=getState().user.user.token;

            const response=await axios.put('http://localhost:8000/api/update-username/',
                {username},
                {headers:{
                    Authorization:  `Token ${token}`, 
                },
            }
            );
            return response.data.username;
        } catch(error){
            return rejectWithValue(error.response?.data || "Unknown error")
        }
    }
);

const updateuserslice=createSlice({
    name:'updatename',
    initialState: {
        username:'',
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
         builder
              .addCase(updateUsername.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(updateUsername.fulfilled, (state, action) => {
                state.loading = false;
                state.username = action.payload;
              })
              .addCase(updateUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update username';
              });
          },
});
export default updateuserslice.reducer;      